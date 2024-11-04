local RSGCore = exports['rsg-core']:GetCoreObject()

RegisterNetEvent('blackmarket:server:buyItem', function(item, amount, price)
    local src = source
    local Player = RSGCore.Functions.GetPlayer(src)

    Player.Functions.AddItem(item, amount)
    Player.Functions.RemoveMoney('cash', price * amount)
end)

RegisterNetEvent('blackmarket:server:sellItem', function(item, amount, price)
    local src = source
    local Player = RSGCore.Functions.GetPlayer(src)

    print('Amount: ' .. amount)

    Player.Functions.RemoveItem(item, amount)
    Player.Functions.AddMoney('cash', price * amount)
end)