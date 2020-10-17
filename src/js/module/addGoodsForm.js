import {addGoodsDB} from './firebase'
import {destroyEl} from './utils'

// форма добавления товаров
export const addGoodsForm = () => {
  const goodsModal = document.getElementById('added-goods-modal')
  const addGoodsClose = document.getElementById('add-goods-close')
  const addedSpecificationGroup = document.querySelector('.added-specifications-group')

  // кнопка удаления поля "свойства"
  const createButtonDelete = () => {
    const buttonDelete = document.createElement('div')
    buttonDelete.classList.add('added-goods-specification')
    buttonDelete.setAttribute('data-specification', 'delete')
    buttonDelete.setAttribute('role', 'button')
    buttonDelete.textContent = '-'
    return buttonDelete
  }

  let current = 1 // стартовое количество поле "свойства"
  // добавление полей "свойства"
  const addedFieldSpecification = ({target}) => {
    const addedSpecificationButton = document.getElementById('added-specification')
    const specificationsGroup = document.querySelector('[data-specifications-goods-group]')

    if (target.dataset.specification === 'delete') {
      current--
      target.parentNode.remove()
      addedSpecificationButton.style.display = 'flex'
    }
    if (target.id === 'added-specification') {
      current++
      if (current <= 5) {
        const cloneSpecifications = specificationsGroup.cloneNode(true)
        const input = cloneSpecifications.querySelector('[data-specifications-goods]')
        input.value = ''
        cloneSpecifications.append(createButtonDelete())
        addedSpecificationButton.insertAdjacentElement('beforebegin', cloneSpecifications)
      }
      // скрытие кнопки добаления полей "свойства"
      current >= 5 && (addedSpecificationButton.style.display = 'none')
    }

  }

  const submitForm = (e) => {
    try {
      e.preventDefault()
      const {target} = e
      const fullName = target.querySelector('#full-name').value
      const arrNameValue = target.querySelector('#arr-name').value
      const mainName = target.querySelector('#main-name').value
      const priceGoods = target.querySelector('#price-goods').value
      const shopGoods = target.querySelector('#shop-goods').value
      const infoGoods = target.querySelector('#info-goods').value
      const typeGoods = target.querySelector('#type-goods').value
      const specificationsGoods = target.querySelectorAll('[data-specifications-goods]')
      const dataSpecifications = {}
      const arrName = []

      for (let i = 0; i < specificationsGoods.length; i++) {
        dataSpecifications['s' + i] = specificationsGoods[i].value
      }

      arrNameValue.split(',').forEach(i => {
        i = i.trim()
        i !== '' && arrName.push(i)
      })

      const data = {
        props: {
          fullName: fullName,
          img: {
            main: 'https://pivnoe-delo.info/wp-content/uploads//spetsial-no-dlya-potrebiteley-predpochitayushchikh-boleye-krepkiye-sorta-piva-byla-razrabotana-novinka-baltika-9-vishnevoye.png'
          },
          mainName: mainName,
          name: arrName,
          price: priceGoods,
          shop: shopGoods,
          specifications: dataSpecifications,
          info: infoGoods,
          type: typeGoods
        },
      }

      addGoodsDB(data)
    } catch (e) {
      throw new Error(e)
    }

  }


  addedSpecificationGroup.addEventListener('click', addedFieldSpecification)
  addGoodsClose.addEventListener('click', () => destroyEl(goodsModal))
  goodsModal.addEventListener('submit', submitForm)

}
