const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35859686-36ef21cd2f26c66500ecce7f0';
	
export const apiRequest = (search, page, PER_PAGE) => {
	const url = `${BASE_URL}?key=${API_KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PER_PAGE}`;
	return fetch(url);
}
