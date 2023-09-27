import { ProjectInterface } from '@/common.types';
import Modal from '@/components/Modal';
import ProjectActions from '@/components/ProjectActions';
import RelatedProjects from '@/components/RelatedProjects';
import { getProjectDetails } from '@/lib/actions';
import { getCurrentUser } from '@/lib/session';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface ProjectProps {
  params: {
    id: string;
  };
}

const Project: FC<ProjectProps> = async ({ params: { id } }) => {
  const session = await getCurrentUser();
  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };

  if (!session?.user) redirect('/');

  if (!result?.project) return <p>Falied to fetch project information</p>;

  return (
    <Modal>
      <section className="flexBetween gap-y-8 max-w-4xl max-xl:flex-col w-full">
        <div className="flex-1 flex items-center gap-5 w-full max-xs:flex-col">
          <Link href={`/profile/${result.project?.createdBy?.id}`}>
            <Image
              src={result.project?.createdBy?.avatarUrl}
              alt={result.project?.createdBy?.name}
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>

          <div className="flex-1 flexStart flex-col gap-1">
            <p className="self-start text-lg font-semibold">
              {result.project?.title}
            </p>
            <div className="user-info">
              <Link href={`/profile/${result.project?.createdBy?.id}`}>
                {result.project?.createdBy?.name}
              </Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
              <Link
                href={`/?category=${result.project?.category}`}
                className="text-primary-purple font-semibold"
              >
                {result.project?.category}
              </Link>
            </div>
          </div>

          {session?.user?.id === result.project?.createdBy?.id && (
            <div className="flex justify-end items-center gap-2">
              <ProjectActions projectId={result.project?.id} />
            </div>
          )}
        </div>
      </section>

      <section className="mt-14">
        <Image
          src={result.project?.image}
          alt={result.project?.title}
          width={1064}
          height={798}
          className="rounded-2xl object-cover"
        />
      </section>

      <section className="mt-20 flexCenter flex-col">
        <p>{result.project?.description}</p>

        <div className="flex flex-wrap mt-5 gap-5">
          <Link
            href={result.project?.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 text-sm font-medium text-primary-purple"
          >
            🖥 <span className="underline">GitHub</span>
          </Link>
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <Link
            href={result.project?.liveSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 text-sm font-medium text-primary-purple"
          >
            🚀 <span className="underline">Live Site</span>
          </Link>
        </div>
      </section>

      <section className="flexCenter w-full gap-8 mt-28">
        <span className="w-full h-0.5 bg-light-white-200" />
        <Link
          href={`/profile/${result.project?.createdBy?.id}`}
          className="min-w-[82px] h-[82px]"
        >
          <Image
            src={result.project?.createdBy?.avatarUrl}
            className="rounded-full"
            width={82}
            height={82}
            alt={result.project?.createdBy?.name}
          />
        </Link>
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>

      <RelatedProjects
        userId={result.project?.createdBy?.id}
        projectId={result.project?.id}
      />
    </Modal>
  );
};

export default Project;
