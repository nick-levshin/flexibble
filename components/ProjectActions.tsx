'use client';

import { deleteProject, fetchToken } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

interface ProjectActionsProps {
  projectId: string;
}

const ProjectActions: FC<ProjectActionsProps> = ({ projectId }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteProject = async () => {
    setIsDeleting(true);

    const { token } = await fetchToken();

    try {
      await deleteProject(projectId, token);
      router.push('/');
    } catch (e) {
      console.log(e);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src="/pencile.svg" width={15} height={15} alt="edit" />
      </Link>

      <button
        type="button"
        className={`flexCenter delete-action_btn transition-colors ${
          isDeleting ? 'bg-gray' : 'bg-primary-purple'
        }`}
        onClick={handleDeleteProject}
        disabled={isDeleting}
      >
        <Image src="/trash.svg" width={15} height={15} alt="delete" />
      </button>
    </>
  );
};

export default ProjectActions;
