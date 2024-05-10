/* eslint-disable no-unused-vars */
import {
  render,
  screen,
  within,
  toHaveTextContent,
} from '@testing-library/react-native';

import { RepositoryListContainer } from '../../components/RepositoryList';
import parseThousands from '../../utils/parseThousands';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here
      const parseItemValues = (repositoryItem) => {
        const { id, ownerAvatarUrl, ...repositoryInput } = repositoryItem;

        Object.keys(repositoryInput).forEach((item) => {
          if (typeof repositoryInput[item] === 'number') {
            repositoryInput[item] = parseThousands(repositoryInput[item]);
          }
        });

        return repositoryInput;
      };

      render(<RepositoryListContainer repositories={repositories} />);

      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
      const parsedFirstItem = parseItemValues(repositories.edges[0].node);
      const parsedSecondItem = parseItemValues(repositories.edges[1].node);

      Object.values(parsedFirstItem).forEach((value) => {
        expect(firstRepositoryItem).toHaveTextContent(value);
      });

      Object.values(parsedSecondItem).forEach((value) => {
        expect(secondRepositoryItem).toHaveTextContent(value);
      });
    });
  });
});
