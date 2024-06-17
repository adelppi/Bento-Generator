import {
  VStack,
  Heading,
  Input,
  Button,
  Image,
  Box,
  Text,
} from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { useLocation } from "react-router-dom";

const Generate = () => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const API_KEY = query.get("key");
  const GEN_URL = `https://${API_KEY}.ngrok-free.app/sdapi/v1/txt2img`;

  const [prompt, setPrompt] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const generateImage = (prompt: string) => {
    axios
      .post(GEN_URL, {
        prompt:
          "bento,  <lora:bento_v1:1>, lunch box, ((best quality)), RAW photo, subject, 8k uhd, dslr, soft lighting, high quality, film grain, (white rice:0.7), " +
          prompt,
        negative_prompt:
          "(worst quality:1.2), (bad quality:1.2), (poor quality:1.2), (deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime), text, cropped, out of frame, jpeg artifacts, ugly, duplicate, morbid, mutilated, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, disfigured, gross proportions, UnrealisticDream",
        seed: -1,
        width: 720,
        height: 360,
        sampler_name: "DPM++ 2M Karras",
        cfg_scale: 7.0,
        steps: 20,
        batch_size: 1,
        sd_model_name: "AlbedoBase_XL",
        seed_resize_from_w: -1,
        seed_resize_from_h: -1,
        denoising_strength: 0.7,
        clip_skip: 2,
        enable_hr: true,
        hr_scale: 2,
        hr_sampler: "Latent (bicubic)",
      })
      .then((response: AxiosResponse) => {
        setImage(response.data.images[0]);
        setLoading(false);
      });
  };

  return (
    <Box
      w="100vw"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack w="50%" spacing="2rem">
        <Heading fontSize="6xl">お弁当画像生成</Heading>
        <Input
          color="black"
          _hover={{ borderColor: "#0070f3" }}
          placeholder="プロンプトを入力"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Box h="2rem">
          <Button
            colorScheme="blue"
            w="8rem"
            display={isLoading ? "none" : "inherit"}
            onClick={() => {
              setLoading(true);
              generateImage(prompt);
            }}
          >
            生成
          </Button>
        </Box>
        <Box w="1024px" h="512px" display="flex" justifyContent="center">
          {isLoading ? (
            <VStack>
              <Oval color="#0070f3" secondaryColor="#0070f3" />
              <Text>生成中...</Text>
            </VStack>
          ) : (
            image && (
              <Image
                src={"data:image/png;base64," + image}
                alt="生成されたお弁当の画像"
              />
            )
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default Generate;
