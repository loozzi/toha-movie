import { DownOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { Button, Dropdown, Flex, MenuProps, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

interface DropdownFilterCompProps {
  label: string
  items: MenuProps['items']
  queryKey: string
}

const DropdownFilterComp = (props: DropdownFilterCompProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selected, setSelected] = useState<string | null>('Tất cả')
  const [_items, setItems] = useState<MenuProps['items']>([])

  const { label, items, queryKey } = props

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key == 'all') {
      searchParams.delete(queryKey)
      setSearchParams(searchParams)
      setSelected('Tất cả')
    } else {
      const itemSelected: any = (items ?? []).find((item: any) => item.key == e.key)
      searchParams.set(queryKey, itemSelected?.value)
      setSearchParams(searchParams)
      setSelected(itemSelected?.label)
    }
  }

  const menuProps = {
    items: _items,
    onClick: handleMenuClick
  }

  useEffect(() => {
    setItems([{ key: 'all', label: 'Tất cả', value: '', icon: <PlusSquareOutlined /> } as any, ...(items ?? [])])
  }, [items])

  return (
    <Space direction='vertical'>
      <center>{label}</center>
      <Dropdown menu={menuProps} overlayStyle={{ height: 300, overflow: 'auto', width: 200 }}>
        <Button style={{ width: 200 }}>
          <Flex justify='space-between'>
            {selected}
            <DownOutlined />
          </Flex>
        </Button>
      </Dropdown>
    </Space>
  )
}

export default DropdownFilterComp
