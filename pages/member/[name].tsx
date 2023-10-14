import React from 'react';
import { dehydrate, useQuery } from 'react-query';
import { Grid, Text, Button, Title, Image } from '@mantine/core';

import { queryClient, memberByName } from '../../src/api';
// import { Link } from 'tabler-icons-react';

import Link from 'next/link';
export async function getServerSideProps({ params }) {
  await queryClient.prefetchQuery(['member'], () =>
    memberByName({ name: params.name })
  );

  return {
    props: {
      name: params.name,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const MemberDetail: React.FunctionComponent<{
  name: string;
}> = ({ name }) => {
  const { data } = useQuery(['member'], () => memberByName({ name }));

  if (!data.FamilyMember) {
    return <div>No member found</div>;
  }

  return (
    <div
      style={{
        backgroundImage: `url("./christmasBG.jpg")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Grid>
        <Grid.Col xs={12} md={6} lg={4}>
          <Image src={data.FamilyMember.image} alt={data.FamilyMember.name} />
        </Grid.Col>
        <Grid.Col xs={12} md={6} lg={4}>
          <Title order={1} className="text-center text-4xl font-sans">
            {data.FamilyMember.name}
          </Title>

          <Grid mt={10}>
            <Grid.Col span={10}>
              <h1 className="text-2xl font-bold text-red-600 text-decoration-line: underline">
                Christmas List:
              </h1>
              {data.FamilyMember.list && (
                <ul className="list-disc ml-7 border-green-500 border-2">
                  {data.FamilyMember.list.map((item, index) => (
                    <li className="text-xl" key={index}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </Grid.Col>
            <Grid.Col span={7}>
              <Title
                order={4}
                className="text-2xl text-decoration-line: underline"
              >
                Important Info
              </Title>
              <h2>
                <a className="text-2xl">{data.FamilyMember.info}</a>
              </h2>
            </Grid.Col>
          </Grid>
        </Grid.Col>

        <Grid.Col xs={12} md={6} lg={4}>
          <Link href={'/'}>
            <Button fullWidth className="bg-green-600">
              Back Home
            </Button>
          </Link>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default MemberDetail;
