export const initializeWeb3 = () => {
  let isEthereumSupported;
  if (!window.ethereum || !window.web3) {
    isEthereumSupported = false;
  } else {
    isEthereumSupported = true;
  }
  return isEthereumSupported;
};
