import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  background-color: white;
  height: 80px;
  width: 80px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Box = styled(motion.div)`
  height: 200px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Button = styled(motion.button)`
  margin-top: 30px;
  background-color: #f1f1f1;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  transition: color 0.3s ease, transform 0.3s ease;

  &:focus {
    outline: none;
  }
`;

const boxVariants = {
  initial: {
    scale: 1,
    transformOrigin: "center center", // 기본 고정점
  },
  hover: (custom: string) => {
    let originX = "center";
    let originY = "center";

    if (custom === "1") {
      originX = "right";
      originY = "bottom";
    } else if (custom === "2") {
      return { scale: 1 };
    } else if (custom === "3") {
      return { scale: 1 };
    } else if (custom === "4") {
      originX = "left";
      originY = "top";
    }

    console.log(`${originX} ${originY}`);
    return {
      scale: 1.1,
      transformOrigin: `${originX} ${originY}`,
    };
  },
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [isClicked, setIsClicked] = useState(false);
  return (
    <Wrapper>
      <AnimatePresence>
        <Grid>
          {["1", "2", "3", "4"].map((n) => (
            <div key={`grid-item-${n}`} style={{ position: "relative" }}>
              <Box
                onClick={() => setId(n)}
                layoutId={`box-${n}`} // layoutId에 고유 값 추가
                custom={n}
                variants={boxVariants}
                initial="initial"
                whileHover="hover"
              >
                {n === "2" && !isClicked ? <Circle layoutId="circle" /> : null}
                {n === "3" && isClicked ? <Circle layoutId="circle" /> : null}
              </Box>
            </div>
          ))}
        </Grid>

        {id ? (
          <Overlay
            key={`overlay-${id}`} // Overlay에 고유한 key 할당
            onClick={() => setId(null)}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <Box
              layoutId={`overlay-box-${id}`} // Overlay의 Box에도 고유한 layoutId 설정
              key={`overlay-box-${id}`} // 고유한 key 할당
              style={{ width: 300, height: 200, backgroundColor: "white" }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <Button
        onClick={() => setIsClicked(!isClicked)}
        animate={{
          color: isClicked ? "red" : "blue",
          scale: isClicked ? 1.1 : 1,
        }}
        transition={{ duration: 0 }}
      >
        Switch
      </Button>
    </Wrapper>
  );
}

export default App;
