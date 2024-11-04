Config = Config or {}

Config.Inventory = 'rsg-inventory' -- Only used for image purposes
Config.Locations = {
    ['blackmarket1'] = { -- Unique ID of the blackmarket, must be unique!
        label = 'Blackmarket 1', -- The name of the blackmarket can be anything
        ped = 'amsp_robsdgunsmith_males_01', -- The model of the Blackmarket ped
        coords = vec4(-318.40, 819.43, 118.69, 11.82), -- The location of the ped, HAS TO BE VECTOR4
        sellItems = { -- Leave as an empty table if you don't want it to sell anything!
            {
                label = 'Heroin', -- Simply a label for the item, can be anything.
                name = 'drug_heroin', -- The spawncode for the item itself from items.lua
                amount = 15, -- The amount of items you can buy the current session if globalAmount is true
                price = 10, -- The price of the item!
            },
            {
                label = 'Lockpick',
                name = 'lockpick',
                image = 'lockpick_wagon',
                amount = 25,
                price = 3,
            },
            {
                label = 'Pocket Watch',
                name = 'pocket_watch',
                amount = 10,
                price = 5,
            },
            {
                label = 'Jewelry Box',
                name = 'jewelry_box',
                image = 'provision_jewelry_box', -- Only needed if the name of the image is different to the item name! DO NOT ADD THE EXTENSION!
                amount = 5,
                price = 25,
            },
            {
                label = 'Lock',
                name = 'lock',
                amount = 50,
                price = 3.5,
            },
        },
        buyItems = {
            {
                label = 'Key',
                image = 'provision_key_house',
                name = 'key1',
                amount = 100, -- The amount of items you can sell the current session if globalAmount is true
                price = 0.5,
            },
            {
                label = 'Key',
                image = 'provision_key_house2',
                name = 'key2',
                amount = 100,
                price = 0.5,
            },
        },
        globalAmount = true, -- Whether or not the player has a limit of items to buy or sell per game session!
    }
}