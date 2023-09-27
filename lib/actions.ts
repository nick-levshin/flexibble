import { ProjectForm } from '@/common.types';
import {
  createProjectMutation,
  createUserMutation,
  deleteProjectMutation,
  getProjectByIdQuery,
  getProjectsOfUserQuery,
  getUserQuery,
  projectsQuery,
  projectsQueryByCategory,
  updateProjectMutation,
} from '@/graphql';
import { isBase64Regex } from '@/utils';
import { GraphQLClient } from 'graphql-request';

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ''
  : 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ''
  : 'letmein';
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (e) {
    throw e;
  }
};

export const getUser = (email: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader('x-api-key', apiKey);
  const variables = { input: { name, email, avatarUrl } };
  return makeGraphQLRequest(createUserMutation, variables);
};

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);

    return response.json();
  } catch (e) {
    throw e;
  }
};

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: 'POST',
      body: JSON.stringify({ path: imagePath }),
    });

    return response.json();
  } catch (e) {
    throw e;
  }
};

export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    client.setHeader('Authorization', `Bearer ${token}`);

    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId,
        },
      },
    };

    return makeGraphQLRequest(createProjectMutation, variables);
  }
};

export const editProject = async (
  id: string,
  form: ProjectForm,
  token: string
) => {
  const isUploadingNewImage = isBase64Regex(form.image);

  let updatedFrom = { ...form };

  if (isUploadingNewImage) {
    const imageUrl = await uploadImage(form.image);

    if (imageUrl.url) {
      updatedFrom = {
        ...form,
        image: imageUrl.url,
      };
    }
  }

  const variables = {
    id,
    input: {
      ...updatedFrom,
    },
  };

  client.setHeader('Authorization', `Bearer ${token}`);

  return makeGraphQLRequest(updateProjectMutation, variables);
};

export const fetchAllProjects = async (
  category?: string,
  endcursor?: string | null
) => {
  client.setHeader('x-api-key', apiKey);
  const request = category ? projectsQueryByCategory : projectsQuery;
  return makeGraphQLRequest(request, { category, endcursor });
};

export const getProjectDetails = (id: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getProjectByIdQuery, { id });
};

export const getUserProjects = (id: string, last?: number) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
};

export const deleteProject = (id: string, token: string) => {
  client.setHeader('Authorization', `Bearer ${token}`);
  return makeGraphQLRequest(deleteProjectMutation, { id });
};
