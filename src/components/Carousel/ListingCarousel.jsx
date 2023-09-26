import { Carousel } from "@mantine/carousel";
import ListingCard from "../Cards/ListingCard";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons";
import axios from "axios";
import { Group, Paper } from "@mantine/core";
import { Link } from "react-router-dom";
import CardSkeleton from "../Skeletons/CardSkeleton";
import { useMediaQuery } from "@mantine/hooks";
import ListingCardAccordingToOriginalDesign from "../Cards/ListingCardAccordingToOriginalDesign";

export default function ListingCarousel({ listings, loading, error }) {
  const match768 = useMediaQuery("(max-width: 768px)");

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {loading && (
        <Group position="center">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          {/* <CardSkeleton /> */}
        </Group>
      )}
      {listings.length !== 0 && (
        <Carousel
          slideGap="md"
          slideSize={"33%"}
          breakpoints={[
            { maxWidth: "xl", slideSize: "33%" },
            { maxWidth: "lg", slideSize: "50%" },
            { maxWidth: "xs", slideSize: "100%", slideGap: "sm" },
          ]}
          loop
          align="center"
          // controlsOffset={0}
          // slidesToScroll={match768 ? 1 : 3}
          nextControlIcon={
            <IconArrowRight size={18} style={{ color: "#fff" }} />
          }
          previousControlIcon={
            <IconArrowLeft size={18} style={{ color: "#fff" }} />
          }
          styles={{
            control: {
              border: "1px solid red",
              width: "40px",
              height: "40px",
              backgroundColor: "#D92228",
              opacity: 100,

              "&:first-of-type": {
                marginLeft: -50,

                "@media (max-width: 768px)": {
                  marginLeft: 0,
                },
              },
              "&:last-of-type": {
                marginRight: -50,

                "@media (max-width: 768px)": {
                  marginRight: 0,
                },
              },
            },
          }}
          // sx={{
          //   maxHeight: "400px",
          // }}
        >
          {listings.map((property) => (
            <Carousel.Slide
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              key={property?._id}
            >
              <Link
                to={`/property/${property?._id}`}
                state={{ data: property }}
                style={{ textDecoration: "none" }}
              >
                <ListingCardAccordingToOriginalDesign property={property} />
              </Link>
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </>
  );
}
