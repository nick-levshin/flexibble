import { FC } from 'react';
import { fetchAllProjects } from '@/lib/actions';
import { ProjectInterface } from '@/common.types';
import ProjectCard from '@/components/ProjectCard';
import Categories from '@/components/Categories';
import LoadMore from '@/components/LoadMore';

interface HomePageProps {
  searchParams: {
    category?: string;
    endcursor?: string;
  };
}

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviosPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

const HomePage: FC<HomePageProps> = async ({
  searchParams: { category, endcursor },
}) => {
  const data = (await fetchAllProjects(category, endcursor)) as ProjectSearch;

  const projectsToDisplay = data?.projectSearch.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />

        <p className="no-result-text text-center">
          No projects found, go create some first.
        </p>
      </section>
    );
  }

  const pagination = data?.projectSearch?.pageInfo;
  console.log(data);

  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />

      <section className="projects-grid">
        {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={node?.id}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
          />
        ))}
      </section>

      <LoadMore
        startCursor={pagination?.startCursor as string}
        endCursor={pagination?.endCursor as string}
        hasPreviousPage={pagination?.hasPreviosPage as boolean}
        hasNextPage={pagination?.hasNextPage as boolean}
      />
    </section>
  );
};

export default HomePage;
