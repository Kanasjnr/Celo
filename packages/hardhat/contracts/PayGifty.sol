// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PayGifty {
    struct GiftCard {
        address owner;
        uint256 amount;
        bool isRedeemed;
    }

    uint256 public cardCounter;
    mapping(uint256 => GiftCard) public giftCards;

    event GiftCardBought(uint256 indexed cardId, address indexed buyer, uint256 amount);
    event GiftCardRedeemed(uint256 indexed cardId, address indexed redeemer);

    function buyGiftCard() external payable {
        require(msg.value > 0, "Amount should be greater than zero");

        giftCards[cardCounter] = GiftCard({
            owner: msg.sender,
            amount: msg.value,
            isRedeemed: false
        });

        emit GiftCardBought(cardCounter, msg.sender, msg.value);
        cardCounter++;
    }

    function redeemGiftCard(uint256 cardId) external {
        GiftCard storage card = giftCards[cardId];
        require(card.owner == msg.sender, "Only the owner can redeem the gift card");
        require(!card.isRedeemed, "Gift card is already redeemed");

        uint256 amount = card.amount;
        card.isRedeemed = true;
        card.amount = 0;

        payable(msg.sender).transfer(amount);

        emit GiftCardRedeemed(cardId, msg.sender);
    }
}
