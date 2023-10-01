import { LoginOutlined, UserOutlined } from '@ant-design/icons'
import type { RefineThemedLayoutV2HeaderProps } from '@refinedev/antd'
import { useGetIdentity, useLogout } from '@refinedev/core'
import { Layout as AntdLayout, Avatar, Dropdown, MenuProps } from 'antd'
import React from 'react'
import { useColor } from 'antd-utility'
import { useQueryClient } from '@tanstack/react-query'

const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({ sticky }) => {
  const { data: user } = useGetIdentity<any>()

  const { colorBgElevated } = useColor()

  const headerStyles: React.CSSProperties = {
    backgroundColor: colorBgElevated,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0px 24px',
    height: '64px',
  }

  if (sticky) {
    headerStyles.position = 'sticky'
    headerStyles.top = 0
    headerStyles.zIndex = 1
  }

  const queryClient = useQueryClient()
  const { mutate: logout } = useLogout()

  const handleLogOut = () => {
    logout()
    queryClient.clear()
  }

  const displayName = user?.display_name || 'Unknown'

  const userOptions: MenuProps['items'] = [
    {
      key: 'userName',
      label: (
        <p className="m-0 cursor-default relative">
          {displayName}{' '}
          <span className="absolute bottom-0 right-0 text-xs">
            #{user?.username}
          </span>
        </p>
      ),
      icon: <UserOutlined className="w-4" />,
    },
    {
      type: 'divider',
    },

    // {
    //     key: 'mode',
    //     label: (
    //         <p className="m-0" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
    //             {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
    //         </p>
    //     ),
    //     icon: <div className="inline-block w-4">{mode === 'light' ? '🌛' : '🔆'}</div>,
    // },

    {
      type: 'divider',
    },
    {
      key: 'logOut',
      label: (
        <p className="m-0" onClick={handleLogOut}>
          Log Out
        </p>
      ),
      icon: <LoginOutlined className="w-4" />,
    },
  ]

  return (
    <AntdLayout.Header style={headerStyles}>
      <Dropdown
        menu={{ items: userOptions }}
        overlayClassName="w-60"
        trigger={['click']}
      >
        <Avatar
          className="cursor-pointer"
          style={{
            backgroundColor: '#fde3cf',
            color: '#f56a00',
          }}
        >
          {displayName?.charAt(0).toUpperCase()}
        </Avatar>
      </Dropdown>
    </AntdLayout.Header>
  )
}

export default Header
