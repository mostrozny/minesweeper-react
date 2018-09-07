import { store } from 'react-easy-state';

const appStore = store({
    points: 0,
    icon: "smile",
    gameOver: false,
});

export default appStore;