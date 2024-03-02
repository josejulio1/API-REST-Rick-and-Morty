document.querySelectorAll('.button-item').forEach(buttonItem => {
    buttonItem.addEventListener('click', e => {
        const { target } = e;
        document.querySelectorAll('main > div:not(.hide)').forEach(itemsNotHide => {
            itemsNotHide.classList.add('hide');
        })
        document.querySelectorAll('#aside-section article:not(.hide)').forEach(itemsNotHide => {
            itemsNotHide.classList.add('hide-aside');
        })
        const id = target.id.split('-')[1];
        document.querySelector(`.${id}__container`).classList.remove('hide');
        document.getElementById(`${id}-aside`).classList.remove('hide-aside');
    })
})

const $aside = document.getElementById('aside');
const $openFilter = document.getElementById('open-filter');
const $asideSection = document.getElementById('aside-section');
const $setDefault = document.getElementById('set-default');

$openFilter.addEventListener('click', () => {
    // Si el panel de filtros está mostrado, ocultar
    if ($aside.classList.contains('show-filter')) {
        $aside.classList.remove('show-filter');
        $aside.classList.add('close-filter');
        $asideSection.classList.add('hide-aside');
        $aside.addEventListener('animationend', () => {
            $asideSection.classList.add('hide-aside');
        })
    } else {
        // Si está oculto, mostrar
        $aside.classList.remove('close-filter');
        $aside.classList.add('show-filter');
        $aside.addEventListener('animationend', () => {
            $asideSection.classList.remove('hide-aside');
        })
    }
})