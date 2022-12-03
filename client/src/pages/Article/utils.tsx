import { Fragment, ReactNode } from 'react';
import { H5, MenuItem, TreeNodeInfo } from '@blueprintjs/core';
import parse, {
  domToReact,
  Element as HTMLParserElement,
  HTMLReactParserOptions,
} from 'html-react-parser';
import { Link } from 'react-router-dom';
import { Article } from '../../utils/dto/article';
import { Category } from '../../utils/dto/category';
import { SearchResult } from 'minisearch';
import { ItemRenderer, ItemRendererProps } from '@blueprintjs/select';

interface NavLinkProps {
  to: string;
  children: ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => (
  <Link className="drawer__link" to={to}>
    {children}
  </Link>
);

export const renderArticle = (
  content: string,
  handleImageClick: (title: string, src: string) => void,
  articles: Article[]
) => {
  if (!content) {
    return <Fragment />;
  }

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof HTMLParserElement && domNode.attribs) {
        if (domNode.children.length === 0 && domNode.name !== 'img') {
          return <Fragment />;
        }

        if (domNode.name === 'h5') {
          return (
            <H5 className="article__header">{domToReact(domNode.children)}</H5>
          );
        }

        if (domNode.name === 'p') {
          return (
            <p className="article__text">
              {domToReact(domNode.children, options)}
            </p>
          );
        }

        if (domNode.name === 'a') {
          const linkHref = domNode.attribs.href;
          const article = articles.find((item) => item.title === linkHref);

          if (!article) {
            return <span>{domToReact(domNode.children)}</span>;
          }
          return (
            <Link className="article__link" to={`/article/${article.slug}`}>
              {domToReact(domNode.children)}
            </Link>
          );
        }

        if (domNode.name === 'img') {
          return (
            <div className="article__img_wrapper">
              <img
                className="article__img"
                src={domNode.attribs.src}
                alt={domNode.attribs.alt}
                onClick={() =>
                  handleImageClick(domNode.attribs.alt, domNode.attribs.src)
                }
              />
              <p className="article__img_text">{domNode.attribs.alt}</p>
            </div>
          );
        }
      }
    },
  };

  return parse(content, options);
};

export const createArticlesTree = (
  articles: Article[] | undefined,
  categories: Category[] | undefined,
  selectedId: string
): TreeNodeInfo[] => {
  const mainPageNode: TreeNodeInfo = {
    id: 0,
    label: <NavLink to="/">Главная</NavLink>,
    isSelected: !selectedId,
  };
  if (!articles || !categories) {
    return [mainPageNode];
  }

  let index = 1;

  const newTree = [...categories]
    // .sort((a, b) => {
    //   if (a.title < b.title) {
    //     return -1;
    //   }

    //   if (a.title > b.title) {
    //     return 1;
    //   }

    //   return 0;
    // })
    .map((category) => {
      const categoryIndex = index;

      const children = [...articles]
        .filter((article) => article.category === category._id)
        .sort((a, b) => {
          if (a.isMainArticle) return -1;
          if (b.isMainArticle) return 1;

          if (a.title < b.title) {
            return -1;
          }

          if (a.title > b.title) {
            return 1;
          }

          return 0;
        })
        .map((article) => {
          index += 1;

          return {
            id: index,
            isSelected: selectedId === article._id,
            label: (
              <NavLink to={`/article/${article.slug}`}>{article.title}</NavLink>
            ),
          };
        });

      if (!children.length) {
        index += 1;
      }

      return {
        id: categoryIndex,
        hasCaret: true,
        label: category.title,
        childNodes: children,
        isExpanded: children.find((child) => child.isSelected) !== undefined,
      };
    });

  return [mainPageNode, ...newTree];
};

export const renderSuggestItem: ItemRenderer<SearchResult> = (
  item: SearchResult,
  itemRendererProps: ItemRendererProps
) => {
  return (
    <MenuItem
      onClick={itemRendererProps.handleClick}
      text={item.title}
      key={item.id}
    />
  );
};

export const renderSuggestValue = (item: SearchResult) => {
  return item.suggestion;
};
