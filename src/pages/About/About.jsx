import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import Flip from "gsap/Flip";
import React, { useEffect } from "react";
import { Page } from "../../components/Page";
import { blue, green, yellow } from "../../utils";
import { Educations, Paragraph, SkillsWrapper, Text } from "./About.styled";
import { AboutItem } from "./AboutItem";
import Skills from "./SkillBall";
import ulsa from "../../assets/images/ulsa.png";
import highschool from "../../assets/images/highschool.jpeg";
import cristobal from "../../assets/images/cristobal.png";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

export const About = () => {
  const { ref, inView } = useInView({});
  const [show, setShow] = useState(inView);
  
  useEffect(() => {
    setShow(inView);
  }, [inView]);

  useEffect(() => {
    gsap.registerPlugin(Flip);
    let cards = document.querySelectorAll(".about-item");
    cards.forEach((card, i) => {
      if (i === 0) {
        card.classList.add("active");
      }
      card.addEventListener("mouseenter", (e) => {
        if (card.classList.contains("active")) {
          return;
        }
        const state = Flip.getState(cards);
        cards.forEach((c) => {
          c.classList.remove("active");
        });
        card.classList.add("active");
        Flip.from(state, {
          duration: 0.5,
          ease: "elastic.out(1,0.9)",
          absolute: true,
        });
      });
    });
  }, []);

  return (
    <div ref={ref}>
      <Page header="About">
        <Text>
          <Paragraph>
            Innovative IT Support Specialist and Software Developer with a dynamic background in financial technology. Passionate about developing ERP solutions, optimizing IT resources, and creating innovative financial strategies. Committed to solving complex technical challenges and delivering exceptional business solutions.
          </Paragraph>
          <Educations>
            <AboutItem
              color={blue}
              active
              data={{
                title: "Universidad La Salle Chihuahua",
                p: "Bachelor of Science in Information Technology (2020-Current)",
                image: ulsa,
              }}
            />
            <AboutItem
              color={green}
              data={{
                title: "Preparatoria La Salle Cuauhtémoc",
                p: "High School Diploma (Graduated 2020)",
                image: highschool,
              }}
            />
            <AboutItem
              color={yellow}
              data={{
                title: "Instituto Cristobal Colón",
                p: "Secondary Education, Cuauhtémoc",
                image: cristobal,
              }}
            />
          </Educations>
        </Text>
        <SkillsWrapper>
          {show ? (
            <Canvas camera={{ position: [0, 0, 18] }}>
              <Skills />
            </Canvas>
          ) : (
            `${inView}`
          )}
        </SkillsWrapper>
      </Page>
    </div>
  );
};