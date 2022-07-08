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
      <Container px={0}>
        <Heading as="h1" fontSize="6xl">
          Questions
        </Heading>
        <VStack alignItems="flex-start" spacing={3}>
          {posts &&
            posts.length > 0 &&
            posts?.map((post, id) => {
              return (
                <Box
                  key={post.struct.id}
                  sx={{
                    py: 4,
                    px: 4,
                    border: "1px solid",
                    borderColor: "gray.300",
                    bg: "white",
                    width: "100%",
                  }}
                >
                  <Container ml={0} pl={0}>
                    <Heading as="h5" fontSize="xl" mb={1}>
                      {post.content?.title}
                    </Heading>
                    {post.content?.body && (
                      <Text as="h5" fontSize="sm">
                        {post.content?.body.substring(0, 300)}
                        {post.content?.body?.length > 300 ? "..." : ""}
                      </Text>
                    )}
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
                    <Text fontSize="sm">
                      {post.struct.repliesCount.toString()} answers
                    </Text>
                  </HStack>
                </Box>
              );
            })}
        </VStack>
      </Container>
    </Box>
  );
};
