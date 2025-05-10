export const fetchHeaderText = async () => {
  // Get the value of the 'hub_lang' cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  // Get lang from cookie (default to 'en' if not set)
  const lang = getCookie('hub_lang') || 'en';

  // Fetch the header text based on the lang
  const response = await fetch(`/api/lang/${lang}`);
  const data = await response.json();
  return data.navbar; // Assuming the JSON has a 'navbar' key
};
