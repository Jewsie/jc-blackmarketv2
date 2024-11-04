const Config = {
    inventory: "rsg-inventory",
};
$('body').hide();
let currentBlackmarket = null;
let tooltip = null;
let contextmenu = null;

$(window).on('keydown', (event) => {
    if (event.keyCode === 27) {
        $.post('https://jc-blackmarket/close', JSON.stringify());
        $('body').fadeOut();
    }
});

window.addEventListener('message', (event) => {
    const data = event.data;
    if (data.type === 'blackmarket') {
        $.post('https://jc-blackmarket/getInventory', JSON.stringify(), (result) => {
            Config.inventory = result;
        });
        currentBlackmarket = data.id;
        if (!data.sells) {
            $('#buyBtn').hide();
        }
        if (!data.buys) {
            $('#sellBtn').hide();
        }
        $('body').fadeIn();
    }
})

function openBuyableItems() {
    $('.shop-content').empty();
    $.post('https://jc-blackmarket/getItems', JSON.stringify({blackmarket: currentBlackmarket}), (items) => {
        $.each(items, (i, item) => {
            var element = $('<div>').addClass('item-element');
            $('.shop-content').append(element);

            var imageSRC = `nui://${Config.inventory}/html/images/${item.name}`;
            if (item.image) {
                imageSRC = `nui://${Config.inventory}/html/images/${item.image}`;
            }

            var imgElement = $('<img>').addClass('item-image').attr('src', imageSRC + '.png');
            $(element).append(imgElement);

            $(imgElement).on('mouseover', (e) => {
                let pageX = e.pageX;
                let pageY = e.pageY;

                if (tooltip != null) {
                    tooltip.remove();
                }
                tooltip = $('<div>').addClass('tooltip');
                tooltip.text(item.label + ' - $' + item.price);
                tooltip.css({
                    'top': (pageY + 10) + 'px',
                    'left': (pageX + 10) + 'px',
                    'font-family': 'blackmarketButtons',
                    'font-size': '24px',
                    'position': 'absolute',
                });
                $('body').append(tooltip);
            });
            $(imgElement).on('mousemove', (e) => {
                let pageX = e.pageX;
                let pageY = e.pageY;
                tooltip.css({
                    'top': (pageY + 10) + 'px',
                    'left': (pageX + 10) + 'px',
                })
            });
            $(imgElement).on('mouseout', (e) => {
                if (tooltip != null) {
                    tooltip.remove();
                    tooltip = null;
                }
            });

            $(imgElement).on('click', (e) => {
                let pageX = e.pageX;
                let pageY = e.pageY;
                
                if (contextmenu) {
                    contextmenu.remove();
                    contextmenu = null;
                }

                contextmenu = $('<div>').addClass('contextmenu');
                contextmenu.css({
                    'top': (pageY + 10) + 'px',
                    'left': (pageX + 10) + 'px',
                    'position': 'absolute',
                })
                $('body').append(contextmenu);

                var title = $('<h3>').text('Buy Amount').css('font-family', 'blackmarketfont');
                var amountInput = $('<input>').addClass('context-input').attr({
                    'type': 'number',
                    'placeholder': 'Amount to buy!',
                    'min': 0,
                    'max': item.amount,
                }).css({
                    'width': '80%',
                    'height': '20px',
                });

                $(amountInput).on('change', () => {
                    if (amountInput.val() > item.amount) {
                        amountInput.val(item.amount);
                    }
                    if (amountInput.val() < 0) {
                        amountInput.val(0);
                    }
                });
                var confirmBtn = $('<button>').addClass('context-btn').text('Confirm');
                var cancelBtn = $('<button>').addClass('context-btn').text('Cancel');

                $(confirmBtn).on('click', () => {
                    $.post('https://jc-blackmarket/buyItem', JSON.stringify({blackmarket: currentBlackmarket, item: item.name, amount: amountInput.val(), price: item.price}));
                    contextmenu.remove();
                    contextmenu = null;
                    openBuyableItems();
                });
                $(cancelBtn).on('click', () => {
                    contextmenu.remove();
                    contextmenu = null;
                });
                $(contextmenu).append(title, amountInput, confirmBtn, cancelBtn);
            });
        });
    });
}

function openSellableItems() {
    $('.shop-content').empty();
    $.post('https://jc-blackmarket/getSellableItems', JSON.stringify({blackmarket: currentBlackmarket}), (items) => {
        $.each(items, (i, item) => {
            var element = $('<div>').addClass('item-element');
            $('.shop-content').append(element);

            var imageSRC = `nui://${Config.inventory}/html/images/${item.name}`;
            if (item.image) {
                imageSRC = `nui://${Config.inventory}/html/images/${item.image}`;
            }

            var imgElement = $('<img>').addClass('item-image').attr('src', imageSRC + '.png');
            $(element).append(imgElement);

            $(imgElement).on('mouseover', (e) => {
                let pageX = e.pageX;
                let pageY = e.pageY;

                if (tooltip != null) {
                    tooltip.remove();
                }
                tooltip = $('<div>').addClass('tooltip');
                tooltip.text(item.label + ' - $' + item.price);
                tooltip.css({
                    'top': (pageY + 10) + 'px',
                    'left': (pageX + 10) + 'px',
                    'font-family': 'blackmarketButtons',
                    'font-size': '24px',
                    'position': 'absolute',
                });
                $('body').append(tooltip);
            });
            $(imgElement).on('mousemove', (e) => {
                let pageX = e.pageX;
                let pageY = e.pageY;
                tooltip.css({
                    'top': (pageY + 10) + 'px',
                    'left': (pageX + 10) + 'px',
                })
            });
            $(imgElement).on('mouseout', (e) => {
                if (tooltip != null) {
                    tooltip.remove();
                    tooltip = null;
                }
            });

            $(imgElement).on('click', (e) => {
                let pageX = e.pageX;
                let pageY = e.pageY;
                
                if (contextmenu) {
                    contextmenu.remove();
                    contextmenu = null;
                }

                contextmenu = $('<div>').addClass('contextmenu');
                contextmenu.css({
                    'top': (pageY + 10) + 'px',
                    'left': (pageX + 10) + 'px',
                    'position': 'absolute',
                })
                $('body').append(contextmenu);

                var title = $('<h3>').text('Buy Amount').css('font-family', 'blackmarketfont');
                var amountInput = $('<input>').addClass('context-input').attr({
                    'type': 'number',
                    'placeholder': 'Amount to sell!',
                    'min': 1,
                    'max': item.amount,
                }).css({
                    'width': '80%',
                    'height': '20px',
                });

                $(amountInput).on('change', () => {
                    if (amountInput.val() > item.amount) {
                        amountInput.val(item.amount);
                    }
                    if (amountInput.val() < 1) {
                        amountInput.val(1);
                    }
                });
                var confirmBtn = $('<button>').addClass('context-btn').text('Confirm');
                var cancelBtn = $('<button>').addClass('context-btn').text('Cancel');

                $(confirmBtn).on('click', () => {
                    console.log(item.name, item.price, currentBlackmarket)
                    $.post('https://jc-blackmarket/sellItem', JSON.stringify({blackmarket: currentBlackmarket, item: item.name, amount: amountInput.val(), price: item.price}));
                    contextmenu.remove();
                    contextmenu = null;
                    setTimeout(function() {
                        openSellableItems();
                    }, 100);
                });
                $(cancelBtn).on('click', () => {
                    contextmenu.remove();
                    contextmenu = null;
                });
                $(contextmenu).append(title, amountInput, confirmBtn, cancelBtn);
            });
        });
    });
}

$('#buyBtn').on('click', () => openBuyableItems());
$('#sellBtn').on('click', () => openSellableItems());