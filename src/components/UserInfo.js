export default class UserInfo {
    constructor({ profileNameSelector, profileStatusSelector }) {
        this._profileName = profileNameSelector;
        this._profileStatus = profileStatusSelector;
    }
    getUserInfo() {
        const profileName = this._profileName.textContent;
        const profileStatus = this._profileStatus.textContent;
        return { profileName: profileName, profileStatus: profileStatus };
    }
    setUserInfo = ({ newProfileName, newProfileStatus }) => {
        this._profileName.textContent = newProfileName;
        this._profileStatus.textContent = newProfileStatus;
    }
}