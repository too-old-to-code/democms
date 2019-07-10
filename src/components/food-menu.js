import styles from './food-menu.module.scss'
import React, {useState} from 'react'
import classnames from 'classnames'
import { useStaticQuery, graphql } from 'gatsby'
import AnimateHeight from 'react-animate-height';

const MenuSubsection = ({node}) => {
  const [open, toggleOpen] = useState(false)

  return (
    <div key={node.id}
      className={styles.menuSection}
    >
      <h4
        onClick={() => toggleOpen(!open)}
        className={styles.heading}
      >
        {node.heading.value}
      </h4>
      {
        node.items.value.map((item, index) => {
          return (
            <AnimateHeight
              duration={ 300 }
              height={ open ? 'auto' : 0}
              key={item.id}
            >
              <MenuItem item={item}  index={index}/>
            </AnimateHeight>
          )
        })
      }
    </div>
  )
}

const MenuItem = (props) => {
  const { name, description, priceIn, priceOut } = props.item
  return (
    <div
      className={classnames(styles.menuItem, { [styles.even]: props.index % 2 === 0 })}
    >
      <div>
        <h6 className={styles.itemName}>{name && name.value}</h6>
        <div className={styles.itemDescription}>{description && description.value}</div>
      </div>
      <div className={styles.itemPrice}>
        {priceIn && priceIn.value}
        {priceIn && priceIn.value && priceOut && priceOut.value ? ' / ' : ''}
        {priceOut && priceOut.value}
      </div>
    </div>
  )
}

const FoodMenu = () => {
  let { allCockpitMenu } = useStaticQuery(graphql`
    query FoodQuery {
      allCockpitMenu {
        edges {
          node {
            id
            heading {
              value
            }
            items {
              value {
                id
                name {
                  value
                }
                description {
                  value
                }
                priceIn {
                  value
                }
                priceOut {
                  value
                }
                notAvailable {
                  value
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <div className={styles.foodMenu}>
    {
      allCockpitMenu.edges.map((item, index) => {
        return <MenuSubsection node={item.node} key={item.node.id}/>
      })
    }
    </div>
  )
}

export default FoodMenu