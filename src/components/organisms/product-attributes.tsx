import React, { Component } from 'react'
import { Div, Font, PressAbbleDiv, ScrollDiv } from '@components/atoms/basic'
import { colors } from '@utils/constants'
import AttributeList from '@src/components/molecules/attribute-list'
import { futuraTitleFont, helveticaNormalFont } from '../commont-styles'
import { moveToFront } from '@utils/helpers'

interface ProductAttributesPropsType {
  attributes: any
  onAllAttributesSelected(any): void
}

class ProductAttributes extends Component<ProductAttributesPropsType, any> {
  state = {
    selectedAttributes: [],
  }
  onSelectAttributes = atribute => {
    const { selectedAttributes } = this.state
    const { attributes } = this.props

    const newAttributes = [...selectedAttributes]
    const indexanttribute = newAttributes.findIndex(
      att => att.attribute_id === atribute.attribute_id,
    )
    if (indexanttribute === -1) {
      newAttributes.push(atribute)
    } else {
      newAttributes[indexanttribute] = atribute
    }
    this.setState({ selectedAttributes: newAttributes }, () => {
      if (newAttributes.length === attributes.length) {
        this.props.onAllAttributesSelected(newAttributes)
      }
    })
  }

  render() {
    const { attributes } = this.props
    const data = moveToFront(attributes, (e: any) => e.label === 'Color')
    return (
      <>
        {data.map(attribute => (
          <AttributeList
            key={attribute.id}
            onAttributesChanged={this.onSelectAttributes}
            attribute={attribute}
          />
        ))}
      </>
    )
  }
}

export default ProductAttributes
