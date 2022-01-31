export const download = (url: string) => new Promise((resolver, reject) =>{
    
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = () => {
        resolver(xhr.response)
    };
    xhr.open('GET', url)
    xhr.send()
});