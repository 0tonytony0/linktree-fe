export const TAB_LINKS = {
    "LINKS" : 'links',
    'APPEARANCE' : 'appearance',
    'ANALYTICS' : 'analytics',
    "SETTINGS" : 'settings'
}

export const clearAuthData = () => {
  localStorage.removeItem("token"); 
};