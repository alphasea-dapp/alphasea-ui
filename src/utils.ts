
import BigNumber from "bignumber.js";

const ethInWei = new BigNumber('1000000000000000000')

export const weiToEth = (wei: string) => {
    const weiNum = new BigNumber(wei)
    return weiNum.dividedBy(ethInWei)
}
