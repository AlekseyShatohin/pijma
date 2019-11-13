import React, {FC, KeyboardEvent, ReactNode} from 'react'

import {TextAreaFieldControl, InputField, BasicTextArea, Stub, Box, Card, Flex, FlexItem} from '@qiwi/pijma-core'

export interface TextAreaFieldProps {
  value: string
  tabIndex?: number
  name?: string
  title?: string
  error?: ReactNode
  action?: ReactNode
  help?: ReactNode
  autoFocus?: boolean
  placeholder?: string
  disabled?: boolean
  maxLength?: number
  minRows?: number
  maxRows?: number
  stub?: boolean
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  onKeyDown?: (event: KeyboardEvent) => boolean
  onKeyUp?: (event: KeyboardEvent) => boolean
}

export const TextAreaField: FC<TextAreaFieldProps> = (props) => (
  props.stub ? (
    <Box>
      {props.title ? (
        <Stub width={15} height={2} top={1} bottom={1}/>
      ) : (
        <Box height={4}/>
      )}
      <Card bb="1px solid rgba(0, 0, 0, 0.2)" height={7}>
        <Flex align="center" justify="space-between" height={1}>
          <FlexItem>
            <Stub width={38} height={3} top={1} bottom={1}/>
          </FlexItem>
        </Flex>
      </Card>
      {props.help || props.error ? (
        <Stub width={15} height={2} top={2} bottom={1}/>
      ) : (
        <Box height={5}/>
      )}
    </Box>
  ) : (
    <TextAreaFieldControl
      onChange={props.onChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onKeyDown={props.onKeyDown}
      onKeyUp={props.onKeyUp}
      value={props.value}
      children={(renderProps) => (
        <InputField
          title={props.title}
          active={renderProps.focused || !!props.value || !!props.placeholder}
          input={(
            <BasicTextArea
              value={props.value}
              name={props.name}
              autoFocus={props.autoFocus}
              placeholder={props.placeholder}
              disabled={props.disabled}
              error={!!props.error}
              focused={renderProps.focused}
              maxLength={props.maxLength}
              ref={renderProps.ref}
              rows={props.maxRows && renderProps.rows > props.maxRows ? props.maxRows : props.minRows && renderProps.rows < props.minRows ? props.minRows : renderProps.rows}
              overflow={props.maxRows && renderProps.rows > props.maxRows ? 'auto' : 'hidden'}
              transition={renderProps.animate ? 'all 100ms cubic-bezier(0.4, 0.0, 0.2, 1)' : undefined}
              onChange={renderProps.onChange}
              onFocus={renderProps.onFocus}
              onBlur={renderProps.onBlur}
              onKeyDown={renderProps.onKeyDown}
              onKeyUp={renderProps.onKeyUp}
            />
          )}
          error={props.error}
          help={props.help}
          action={props.action}
        />
      )}
    />
  )
)

TextAreaField.defaultProps = {
  tabIndex: 0,
}
