import React, {FC, ReactNode} from 'react'

import {TabsControl, TabHeader, Flex, FlexItem, Box, IconProps, Pos, Card, TabBorder} from '@qiwi/pijma-core'

import {Paragraph} from '../typography'

export interface BlockTabsProps {
  items: {
    title: string
    icon?: IconProps['name']
    content?: ReactNode
  }[]
  select?: number
  tabIndex?: number
  vertical?: boolean
  centered?: boolean
  hr?: boolean
  indent?: 's' | 'm' | 'l'
  indentTop?: boolean
  stub?: boolean
  onChange?: () => void
}

const BlockTabsIndent: Record<NonNullable<BlockTabsProps['indent']>, number | string> = {
  s: 8,
  m: '44px 44px 48px',
  l: '44px 68px 48px',
}

const BlockTabsIndentWithoutTop: Record<NonNullable<BlockTabsProps['indent']>, string> = {
  s: '0 32px 32px 32px',
  m: '0 44px 48px 44px',
  l: '0 68px 48px 68px',
}

export const BlockTabs: FC<BlockTabsProps> = ({
  items,
  select = 0,
  tabIndex = 0,
  vertical = false,
  centered = false,
  stub = false,
  hr = true,
  indent = 'm',
  indentTop = true,
  onChange,
}) => {
  return (
    stub ? (
      <Pos type="relative">
        <Flex
          direction="column"
          p={indentTop ? BlockTabsIndent[indent] : BlockTabsIndentWithoutTop[indent]}
        >
          <Flex
            direction="row"
            overflow="auto"
            justify={centered ? 'space-between' : 'flex-start'}
            css={{'&::-webkit-scrollbar': {display: 'none'}, scrollbarWidth: 'none', '-ms-overflow-style': 'none', position: 'relative'}}
          >
            {[true, false, false].map((item, index) => (
              <TabHeader
                key={index}
                title="stub"
                indent={index === (items.length - 1) ? 0 : 5}
                wrap={!centered}
                tabIndex={-1}
                icon="qiwi"
                vertical={vertical}
                select={item}
                width={centered ? 1 : undefined}
                stub
              />
            ))}
            <TabBorder width={centered ? 'calc(33% - 20px)' : vertical ? 13 : 21} left={0} borderRadius={hr}/>
          </Flex>
          <FlexItem>
            {hr ? (
              <Pos type="absolute" width={1} left={0} zIndex={0}>
                <Card mt="-1px" bg="#e6e6e6" width={1} height="1px"/>
              </Pos>
            ) : (
              null
            )}
          </FlexItem>
          <FlexItem mt={4}>
            <Paragraph stub/>
          </FlexItem>
        </Flex>
      </Pos>
    ) : (
      <TabsControl
        select={select}
        length={items.length}
        onChange={onChange}
        children={renderProps => (
          <Pos type="relative">
            <Flex
              direction="column"
              p={indentTop ? BlockTabsIndent[indent] : BlockTabsIndentWithoutTop[indent]}
            >
              <Flex
                direction="row"
                overflow="auto"
                justify={centered ? 'space-between' : 'flex-start'}
                css={{'&::-webkit-scrollbar': {display: 'none'}, scrollbarWidth: 'none', '-ms-overflow-style': 'none', position: 'relative'}}
              >
                {renderProps.items.map((item, index) => (
                  <TabHeader
                    key={index}
                    title={items[index].title}
                    indent={index === (items.length - 1) ? 0 : 5}
                    wrap={!centered}
                    tabIndex={tabIndex}
                    icon={items[index].icon}
                    vertical={vertical}
                    select={item.select}
                    focus={item.focus}
                    width={centered ? 1 : undefined}
                    ref={item.ref}
                    onFocus={item.onFocus}
                    onBlur={item.onBlur}
                    onMouseEnter={item.onMouseEnter}
                    onMouseLeave={item.onMouseLeave}
                    onKeyDown={renderProps.onKeyDown}
                    onClick={item.onClick}
                  />
                ))}
                <TabBorder width={`${renderProps.borderWidth}px`} left={`${renderProps.borderOffSetLeft}px`} borderRadius={hr}/>
              </Flex>
              <FlexItem>
                {hr ? (
                  <Pos type="absolute" width={1} left={0} zIndex={0}>
                    <Card mt="-1px" bg="#e6e6e6" width={1} height="1px"/>
                  </Pos>
                ) : (
                  null
                )}
              </FlexItem>
              {items.map(({content}, index) => (
                <FlexItem key={index}>
                    <Box
                      display={select === index ? 'block' : 'none'}
                      children={content}
                    />
                </FlexItem>
              ))}
            </Flex>
          </Pos>
        )}
      />
    )
  )
}

BlockTabs.defaultProps = {
  select: 0,
  tabIndex: 0,
  vertical: false,
  centered: false,
  stub: false,
  hr: true,
  indent: 'm',
  indentTop: true,
}
