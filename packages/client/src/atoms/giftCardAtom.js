import { atom } from 'recoil';

const giftCardAtom = atom({
  key: 'giftCardAtom',
  default: {
    design: '',
    creatorId: '', // This will be an ObjectId, but you can initialize it as an empty string
    cryptocurrency: '',
    amount: 0,
    note: '',
    recipientEmail: '',
    fees: 0,
    totalAmount: 0,
    createdAt: new Date(),
  },
});

export default giftCardAtom;
