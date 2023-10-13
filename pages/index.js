import { dehydrate, useQuery } from 'react-query';
import Head from 'next/head';
import Link from 'next/link';
import { Grid, Card, Image, Text, Title } from '@mantine/core';

import { queryClient, getMember } from '../src/api';

import christmasBG from '../public/christmasBG.jpg';
export async function getServerSideProps() {
  await queryClient.prefetchQuery(['members'], () => getMember());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Home() {
  const { data } = useQuery(['members'], () => getMember());

  return (
    <div className="bg-red-600">
      <Grid>
        {data?.family.map((member) => (
          <Grid.Col xs={12} md={6} lg={4} key={member.name} p={5}>
            <Link href={`/member/${member.name}`} passHref>
              <Card className="bg-green-600">
                <Card.Section>
                  <Image height={350} src={member.image} alt="green iguana" />
                </Card.Section>
                <Title order={3}>{member.name}</Title>
                <Text className="text-lg text-white">{member.description}</Text>
              </Card>
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
