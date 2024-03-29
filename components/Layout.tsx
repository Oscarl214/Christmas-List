import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  Title,
  Box,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import { Home, ChristmasTree, Snowflake } from 'tabler-icons-react';

export default function Layout({ children }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <Head>
        <title>Leals Christmas Tree</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppShell
        padding="md"
        navbarOffsetBreakpoint="sm"
        fixed
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200 }}
            style={{
              backgroundImage: `url("./christmasBG.jpg")`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Link href="/" passHref>
              <Box sx={{ display: 'flex' }}>
                <Home />
                <Title order={5} ml={10}>
                  Home
                </Title>
              </Box>
            </Link>
          </Navbar>
        }
        header={
          <Header height={60} p="xs">
            <div
              className="bg-red"
              style={{ display: 'flex', alignItems: 'center', height: '100%' }}
            >
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[3]}
                  mr="xl"
                />
              </MediaQuery>
              <ChristmasTree className="text-3xl text-green-500 font-sans" />
              <Text ml={10} className="text-xl font-bold ">
                Leals Christmas Wishes
              </Text>
              <Snowflake className="text-3xl text-blue-300 ml-4" />
            </div>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colors.gray[0],
          },
        })}
      >
        {children}
      </AppShell>
    </div>
  );
}
