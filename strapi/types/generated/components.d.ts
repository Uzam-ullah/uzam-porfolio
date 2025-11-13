import type { Schema, Struct } from '@strapi/strapi';

export interface BlogSection extends Struct.ComponentSchema {
  collectionName: 'components_blog_sections';
  info: {
    displayName: 'Section';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    heading: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blog.section': BlogSection;
    }
  }
}
