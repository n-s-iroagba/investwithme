import { postData, getData, patchItem, deleteItem } from "./api";
import { createWalletUrl, getWalletsUrl, patchWalletUrl, deleteWalletRoute } from "./constants";
import { CreateWalletType, WalletType } from "./types";

export const createWallet = async (data: CreateWalletType) => {
    try {
        const authorizationData = localStorage.getItem('cassockJwtToken') || 'a';
        const response = await postData(createWalletUrl, data, authorizationData);
        if (response.status === 201) {
            alert('wallet added succesfully')
            window.location.reload();
        }
    } catch (error: any) {
        console.error(error)
        alert('unable to create a wallet at this time')
    }
};

export const getAdminWallets = async () => {

    const authorizationData = localStorage.getItem('cassockJwtToken') || 'a'
    try {
        const response: any = await getData(getWalletsUrl, authorizationData);

        if (response.status === 200 && Array.isArray(response.data)) {
            console.log(response.data)
            return response.data
        }
        return []
    } catch (error: any) {
        console.error(error)
    }
}

export const patchWallet = async (data: WalletType) => {
    try {
        const authorizationData = localStorage.getItem('cassockJwtToken') || 'a';

        const response = await patchItem(patchWalletUrl, data, authorizationData);
        if (response.status === 200) {
            alert('wallet updated succesfully')
            window.location.reload();
        }
    } catch (error: any) {
        console.error(error)
        alert('unable to update the wallet at this time')
    }
}

export const deleteWallet = async (id: number) => {
    const url = `${deleteWalletRoute}/${id}`
    try {
        const authorizationData = localStorage.getItem('cassockJwtToken') || 'a';
        const response = await deleteItem(url, authorizationData);
        if (response.status === 200) {
            alert('manager deleted succesfully')
            window.location.reload();
        }
        return response.status
    } catch (error: any) {
        console.error(error)
        alert('unable to delete manager at this time')
    }

}