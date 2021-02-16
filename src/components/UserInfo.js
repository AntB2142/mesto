export default class UserInfo {
    constructor(profileNameSelector, profileStatusSelector, avatar) {
        this._profileName = profileNameSelector;
        this._profileStatus = profileStatusSelector;
        this._avatar = avatar;
    }
    updateAvatar(data) {
        this._avatar.src = data.avatar;
    }
    getUserInfo() {
        const profileName = this._profileName.textContent;
        const profileStatus = this._profileStatus.textContent;
        return { profileName: profileName, profileStatus: profileStatus };
    }
    setUserInfo = (data) => {
        this._profileName.textContent = data.name;
        this._profileStatus.textContent = data.about;
    }
}