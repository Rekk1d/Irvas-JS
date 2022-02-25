import checkNumbersInptut from "./checkNumberInput";

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelectorAll('#width'),
          windowHeight = document.querySelectorAll('#height'),
          windowType = document.querySelectorAll('#view_type'),
          windowProfile = document.querySelectorAll('.checkbox');

    checkNumbersInptut('#width');
    checkNumbersInptut('#height');
    
    function bindActionToElements(elem, event, key) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch(item.nodeName) {
                    case 'SPAN' :
                        state[key] = i;
                        break;
                    case 'INPUT' : 
                        if(item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[key] = 'Холодное' : state[key] = 'Теплое';
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if(i == j) {
                                    box.checked = true;
                                }
                            });
                        } else {
                            state[key] = item.value;
                        }
                        break;
                    case 'SELECT' :
                        state[key] = item.value;
                        break;
                }
            });
            
        });
    }
    bindActionToElements(windowForm, 'click', 'form');
    bindActionToElements(windowHeight, 'input', 'height');
    bindActionToElements(windowWidth, 'input', 'width');
    bindActionToElements(windowType, 'change', 'type');
    bindActionToElements(windowProfile, 'change', 'profile');
};
export default changeModalState;
