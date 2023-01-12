import {
  Button,
  Checkbox,
  Container,
  Grid,
  Group,
  Input,
  NativeSelect,
  NumberInput,
  Paper,
  RingProgress,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core'
import { IconChevronDown, IconCreditCard, IconShoppingBag } from '@tabler/icons'
import React, { useState } from 'react'

const Booking = () => {
  const [payment, setPayment] = useState()
  const [booking, setBooking] = useState()

  const bookingData = [
    { value: 'advance', label: 'Advance' },
    { value: 'full', label: 'Full' },
    { value: 'interested', label: 'Interested In' },
    { value: 'onhold', label: 'On Hold' },
  ]

  const paymentMethods = [
    { value: 'bank', label: 'Bank Transfer' },
    { value: 'cash', label: 'Cash' },
    { value: 'easypaisa', label: 'Easy Paisa' },
  ]

  const countries = [
    { value: 'pakistan', label: 'Pakistan' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ]

  const AdvancePaymentProgress = [{ value: 30, color: 'blue' }]
  const FullPaymentProgress = [{ value: 100, color: 'green' }]
  const InterestedPaymentProgress = [{ value: 0, color: 'yellow' }]
  const OnHoldPaymentProgress = [{ value: 0, color: 'red' }]

  return (
    <Container size={'xl'}>
      <Grid columns={12}>
        <Grid.Col md={6}>
          <Paper
            shadow="sm"
            radius="md"
            withBorder
            style={{ borderColor: 'lightgrey', borderWidth: 1 }}
            p={30}
            mt={30}
          >
            <Group spacing={'xs'} noWrap position="center" mb={'lg'}>
              <Text
                weight={700}
                style={{
                  fontSize: 26,
                  color: '#D92228',
                  textAlign: 'center',
                }}
              >
                Booking
              </Text>
              <IconShoppingBag
                style={{
                  color: '#D92228',
                }}
                size={30}
              />
            </Group>

            <Group position="apart" mt="lg" noWrap>
              <TextInput
                placeholder="Tehseen Riaz"
                style={{
                  width: '100%',
                }}
                label="Full Name"
                required
                size="md"
              />
              <TextInput
                placeholder="tehseen@gmail.com"
                style={{
                  width: '100%',
                }}
                label="Email Address"
                required
                size="md"
              />
            </Group>
            <Group position="apart" mt="lg" noWrap>
              <NumberInput
                hideControls
                placeholder="03xxxxxxxxx"
                style={{
                  width: '100%',
                }}
                label="Phone Number"
                required
                size="md"
              />
              <TextInput
                placeholder="Islamabad"
                style={{
                  width: '100%',
                }}
                label="City"
                required
                size="md"
              />
            </Group>
            <Group mt={'lg'}>
              <NumberInput
                hideControls
                label="CNIC"
                size="md"
                style={{
                  width: '100%',
                }}
              />
            </Group>
            <Group mt={'lg'} noWrap>
              <Textarea
                placeholder="your address"
                label="Address"
                size="md"
                style={{ width: '100%' }}
              />
            </Group>
            <Group position="apart" mt="lg" noWrap>
              <NativeSelect
                label="Booking Status"
                placeholder="Select Booking Status"
                data={bookingData}
                rightSection={<IconChevronDown size={14} />}
                rightSectionWidth={40}
                value={booking}
                size="md"
                style={{
                  width: '100%',
                }}
                required
                onChange={(event) => setBooking(event.currentTarget.value)}
              />
              {/* <Select
                clearable
                data={bookingData}
                label="Booking Status"
                placeholder="Select Booking Status"
                size="md"
                style={{
                  width: '100%',
                }}
                value={booking}
                onChange={(event) => setBooking(event.currentTarget.value)}
              />
              <Select
                clearable
                data={paymentMethods}
                label="Payment Method"
                placeholder="Select Payment Method"
                size="md"
                style={{
                  width: '100%',
                }}
                value={payment}
                onChange={(event) => setPayment(event.currentTarget.value)}
              /> */}
              <NativeSelect
                label="Payment Method"
                placeholder="Select Payment Method"
                data={paymentMethods}
                rightSection={<IconChevronDown size={14} />}
                rightSectionWidth={40}
                value={payment}
                size="md"
                style={{
                  width: '100%',
                }}
                required
                onChange={(event) => setPayment(event.currentTarget.value)}
              />
            </Group>
          </Paper>
        </Grid.Col>
        <Grid.Col md={6}>
          <Paper
            shadow="sm"
            radius="md"
            withBorder
            style={{ borderColor: 'lightgrey', borderWidth: 1 }}
            p={30}
            mt={30}
          >
            <Group spacing={'xs'} noWrap position="center" mb={'lg'}>
              <Text
                weight={700}
                style={{
                  fontSize: 26,
                  color: '#D92228',
                  textAlign: 'center',
                }}
              >
                Payment Breakdown
              </Text>
            </Group>
            <Group position="center">
              <RingProgress
                size={120}
                thickness={11}
                sections={
                  booking === 'advance'
                    ? AdvancePaymentProgress
                    : booking === 'full'
                    ? FullPaymentProgress
                    : booking === 'interested'
                    ? InterestedPaymentProgress
                    : OnHoldPaymentProgress
                }
                label={
                  <Text size="xs" align="center">
                    {booking === 'advance' ? (
                      <Text weight={600} size="lg">
                        30%
                      </Text>
                    ) : booking === 'full' ? (
                      <Text weight={600} size="lg">
                        100%
                      </Text>
                    ) : booking === 'interested' ? (
                      <Text weight={600} size="lg">
                        0%
                      </Text>
                    ) : (
                      <Text weight={600} size="lg">
                        0%
                      </Text>
                    )}
                  </Text>
                }
              />
              <Stack>
                <Text size="xs" align="center">
                  {booking === 'advance' ? (
                    <Text weight={600} size="lg">
                      30% Advance Payment Rs.
                    </Text>
                  ) : booking === 'full' ? (
                    <Text weight={600} size="lg">
                      100% Full Payment Rs.
                    </Text>
                  ) : booking === 'interested' ? (
                    <Text weight={600} size="lg">
                      Interested Payment Rs. 0
                    </Text>
                  ) : (
                    <Text weight={600} size="lg">
                      On Hold Payment Rs. 0
                    </Text>
                  )}
                </Text>
              </Stack>
            </Group>
          </Paper>
          <Paper
            shadow="sm"
            radius="md"
            withBorder
            style={{ borderColor: 'lightgrey', borderWidth: 1 }}
            p={30}
            mt={30}
          >
            <Stack>
              <Group position="apart">
                <NumberInput
                  hideControls
                  placeholder="1234 1234 1234 1234"
                  label="Card Number"
                  style={{
                    width: '40%',
                  }}
                  icon={<IconCreditCard />}
                  required
                />
                <NumberInput
                  hideControls
                  placeholder="MM/YY"
                  label="Expiry Date"
                  style={{
                    width: '30%',
                  }}
                  required
                />
                <NumberInput
                  hideControls
                  placeholder="123"
                  label="CVC"
                  style={{
                    width: '20%',
                  }}
                  required
                />
              </Group>
              <Select
                data={countries}
                label="Country"
                placeholder="Choose a conutry"
              />
              <Checkbox label="Remember payment details" color={'red'} />
              <Group mt={'md'} position="apart" noWrap>
                <Button
                  fullWidth
                  style={{
                    backgroundColor: '#D92228',
                    color: 'white',
                  }}
                >
                  Cancel
                </Button>
                <Button
                  fullWidth
                  style={{
                    backgroundColor: '#0b4096',
                    color: 'white',
                  }}
                >
                  Pay
                </Button>
              </Group>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default Booking
