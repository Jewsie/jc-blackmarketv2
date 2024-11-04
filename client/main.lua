local RSGCore = exports['rsg-core']:GetCoreObject()

Citizen.CreateThread(function()
    RegisterNUICallback('getItems', function(data, cb)
        cb(Config.Locations[data.blackmarket].sellItems)
    end)
    RegisterNUICallback('getSellableItems', function(data, cb)
        local items = RSGCore.Functions.GetPlayerData().items
        local tableData = {}
        for _, v in pairs(Config.Locations[data.blackmarket].buyItems) do
            for _, item in pairs(items) do
                if item.name == v.name then
                    tableData[#tableData + 1] = {
                        label = v.label,
                        image = v.image,
                        name = v.name,
                        amount = v.amount,
                        price = v.price,
                    }
                end
            end
        end
        Wait(100)
        cb(tableData)
    end)
    RegisterNUICallback('getInventory', function(data, cb)
        cb(Config.Inventory)
    end)
    RegisterNUICallback('close', function(data, cb)
        SetNuiFocus(false, false)
    end)
    RegisterNUICallback('buyItem', function(data, cb)
        local PlayerData = RSGCore.Functions.GetPlayerData()
        if PlayerData.money['cash'] >= data.price * data.amount then
            TriggerServerEvent('blackmarket:server:buyItem', data.item, data.amount, data.price)
            for _, v in pairs(Config.Locations[data.blackmarket].sellItems) do
                if v.name == data.item then
                    if v.globalAmount then
                        if v.amount then
                            v.amount = v.amount - data.amount
                            break
                        end
                    end
                end
            end
        else
            lib.notif({
                title = 'No money',
                description = 'You don\'t have enough money to buy this item or amount!',
                showDuration = true,
                type = 'error',
            })
            return
        end
    end)
    RegisterNUICallback('sellItem', function(data, cb)
        print(data.item, data.amount, data.price)
        if RSGCore.Functions.HasItem(data.item, tonumber(data.amount)) then
            TriggerServerEvent('blackmarket:server:sellItem', data.item, data.amount, data.price)
            for _, v in pairs(Config.Locations[data.blackmarket].buyItems) do
                if v.name == data.item then
                    if v.globalAmount then
                        if v.amount then
                            v.amount = v.amount - data.amount
                            break
                        end
                    end
                end
            end
        else
            lib.notif({
                title = 'Not Enough',
                description = 'You don\'t have this many items to sell!',
                showDuration = true,
                type = 'error',
            })
            return
        end
    end)
end)

Citizen.CreateThread(function()
    for k, v in pairs(Config.Locations) do
        local model = v.ped
        local coords = v.coords
        RequestModel(model)
        while not HasModelLoaded(model) do
            Wait(0)
        end

        local blackmarket = CreatePed(model, coords.x, coords.y, coords.z - 1.0, coords.w, false, false)
        Citizen.InvokeNative(0x283978A15512B2FE, blackmarket, true)
        SetEntityInvincible(blackmarket, true)
        SetBlockingOfNonTemporaryEvents(blackmarket, true)
        FreezeEntityPosition(blackmarket, true)

        exports['ox_target']:addSphereZone({
            name = v.label,
            coords = coords,
            radius = 1.5,
            debug = false,
            options = {
                {
                    label = 'Talk to stranger',
                    icon = 'fas fa-comment',
                    onSelect = function()
                        local buys = false
                        local sells = false

                        if #v.buyItems > 0 then buys = true end
                        if #v.sellItems > 0 then sells = true end
                        SetNuiFocus(true, true)
                        SendNUIMessage({
                            type = 'blackmarket',
                            id = k,
                            buys = buys,
                            sells = sells,
                        })
                    end
                }
            }
        })
    end
end)