import { FC } from 'react';

interface homePageProps {}

const HomePage: FC<homePageProps> = ({}) => {
  return (
    <section className="flex-start flex-col paddings mb-16">
      <h1>Categories</h1> <h1>Posts</h1> <h1>LoadMore</h1>
    </section>
  );
};

export default HomePage;
