ALTER TABLE community_posts DROP CONSTRAINT community_posts_type_check;
ALTER TABLE community_posts ADD CONSTRAINT community_posts_type_check CHECK (type IN ('suggestion', 'maintenance', 'notice', 'general', 'complaint'));
