import {
  Box,
  Badge,
  Heading,
  Container,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { PostData } from "@subsocial/types/dto";
import { asString } from "@subsocial/utils";
import { useEffect, useState } from "react";
import { useSubsocialApi } from "../../providers/SubsocialApiProvider";

export const Home = () => {
  const { api, subsocialSubstrateApi } = useSubsocialApi();

  const [posts, setPosts] = useState<PostData[] | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      if (api.subsocial) {
        const spaceId = await api.subsocial.substrate.getSpaceIdByHandle(
          "subsocial"
        );

        if (spaceId) {
          const postIds = await api.subsocial.substrate.postIdsBySpaceId(
            spaceId
          );

          if (postIds) {
            const publicPosts = await api.subsocial.findAllPosts(postIds);
            console.log(publicPosts);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setPosts(publicPosts);
          }
        }
      }
    };

    getPosts();
  }, [api]);

  console.log(posts);

  return (
    <Box>
      <Container maxWidth="3xl">
        <Heading as="h1" fontSize="6xl">
          Questions
        </Heading>
      </Container>

      <VStack alignItems="flex-start">
        {posts &&
          posts.length > 0 &&
          posts?.map((post, id) => {
            return (
              <Box
                key={post.struct.id}
                sx={{
                  py: 4,
                  borderTop: "1px solid",
                  borderColor: "gray.300",
                  width: "100%",
                }}
              >
                <Container maxWidth="3xl">
                  <Container ml={0} pl={0}>
                    <Heading as="h5" fontSize="2xl">
                      {post.content?.title}
                    </Heading>
                    <Text as="h5" fontSize="sm">
                      {post.content?.body}
                    </Text>
                  </Container>
                  <HStack pt={4}>
                    {post.content &&
                      post.content.tags &&
                      post.content?.tags?.length > 0 &&
                      post.content?.tags.map((tag, id) => {
                        return (
                          <Badge
                            key={id}
                            sx={{
                              py: 1,
                              px: 2,
                              color: "blackAlpha.700",
                            }}
                          >
                            {tag}
                          </Badge>
                        );
                      })}
                  </HStack>
                </Container>
              </Box>
            );
          })}
      </VStack>
    </Box>
  );
};
