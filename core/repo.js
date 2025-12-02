import apiService from "./apiServices.js";

const API_TOKEN =
  "Bearer c377910508e0820dcdbe36dbdba8586b1227eef5725523410cb1c9050484ff808b77b18044d18ccdfea59a45f00bcc9d487309f3d5103dca7ee6c08fb0d72db7294ba74d3d69179d8c38599356b4adfd164a158282448a3bba6d9f4d80cd08f6f6e054cbaeae40c95ac7ec76849851dad7ebba6bc0cead4bc3eea97690098cfe";

const HOMEPAGE_URL = `api/homepage?populate[0]=heroSection&populate[1]=aboutSection&populate[2]=aboutSection.bigImage&populate[3]=aboutSection.smallImage&populate[4]=aboutSection.feature&populate[5]=servicesSection&populate[6]=divider&populate[7]=whyUs&populate[8]=whyUs.features&populate[9]=whyUs.bigImage&populate[10]=whyUs.smallImage&populate[11]=servicesSection.services&populate[12]=servicesSection.services.icon`;

apiService.setToken(API_TOKEN);

export const getHomepage = async () => {
  const response = await apiService.get(HOMEPAGE_URL);
  return response.data;
};
