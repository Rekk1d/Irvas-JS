import checkNumbersInptut from "./checkNumberInput";

const forms = (state) => {
    const form = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо за заявку! Скоро мы с вами свяжемся',
        erorr: 'Ошибка!'
    };
    
    checkNumbersInptut('input[name="user_phone"]');
    
    const  postDate =  async (url, data) => {
        document.querySelector('.status').innerHTML = message.loading;
        let result = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await result.text();
    };

    const clearInputs = () =>{
        inputs.forEach(item => {
            item.value = '';
        });
    };
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if(item.getAttribute('data-calc') === 'end') {
                for(let key in state) {
                    formData.append(key, state[key]);
                }
            }
            postDate('assets/server.php', formData)
                .then((res) => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.error;
                })
                .finally(() =>{
                    clearInputs();
                    setTimeout(() =>{
                        statusMessage.remove();
                    },3000);
                });
        });
    });
};
export default forms;

