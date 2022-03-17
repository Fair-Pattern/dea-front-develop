import NextLink, { LinkProps as NextLinkProps } from "next/link";
import classNames from "classnames";
import React from "react";

export interface LinkProps extends NextLinkProps {
  children: React.ReactNode;
  inline?: boolean;
  classes?: string;
  underline?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | null;
}

type WrapperProps = {
  children: React.ReactNode;
};

const Link = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  locale,
  children,
  inline = true,
  classes = "",
  underline = false,
  onClick = null,
  ...otherProps
}: LinkProps) => {
  const className = classNames("cursor-pointer", classes, {
    ["underline"]: underline,
  });

  const Wrapper = ({ children }: WrapperProps) => (
    <NextLink
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      prefetch={prefetch}
      locale={locale}
    >
      <span className={className}>{children}</span>
    </NextLink>
  );

  return onClick ? (
    <Wrapper>
      <a
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        className={className}
        {...otherProps}
      >
        {children}
      </a>
    </Wrapper>
  ) : (
    <Wrapper>{children}</Wrapper>
  );
};

export default Link;
