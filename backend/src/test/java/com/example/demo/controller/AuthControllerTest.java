package com.example.demo.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AuthService;

import com.fasterxml.jackson.databind.ObjectMapper;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_CLASS)
@SpringBootTest
class AuthControllerTest {
  private static final String END_POINT_PATH = "/api/auth";

  @Autowired
  private WebApplicationContext applicationContext;
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private UserRepository userRepository;

  @MockBean
  private AuthService service;

  @BeforeEach
  public void init() {
    // clean lastUser
    userRepository.deleteAll();
    // setDefaultUser
    this.mockMvc = MockMvcBuilders
        .webAppContextSetup(applicationContext).apply(springSecurity())
        .build();
  }

  public User setupUser() {
    User newUser = new User();
    newUser.setEmail("test123@test.com");
    newUser.setPassword("password");
    newUser.setName("testFromName");
    newUser.setUsername("testFromUserName");

    newUser = userRepository.save(newUser);

    return newUser;
  }

  @Test
  public void testSignupShouldReturn201Created() throws Exception {

    String requestBody = objectMapper.writeValueAsString(setupUser());

    mockMvc.perform(MockMvcRequestBuilders.post(END_POINT_PATH + "/signup")
        .contentType("application/json")
        .content(requestBody))
        .andExpect(status().isCreated())
        .andDo(print());
  }

  /*
   * @Test
   * public void testLoginShouldReturn200Ok() throws Exception {
   * 
   * String requestBody = objectMapper.writeValueAsString(setupUser());
   * 
   * mockMvc.perform(MockMvcRequestBuilders.post(END_POINT_PATH + "/login")
   * .contentType("application/json")
   * .content(requestBody))
   * .andExpect(status().isCreated())
   * .andDo(print());
   * }
   */
  @Test
  public void testGetEmailShouldReturn200Ok() throws Exception {

    mockMvc.perform(MockMvcRequestBuilders.get(END_POINT_PATH + "/email")
        .contentType("application/json"))
        .andExpect(status().isOk())
        .andDo(print());
  }

  @Test
  public void testWithoutAUthReturn401Unauthorized() throws Exception {

    mockMvc.perform(MockMvcRequestBuilders.get(END_POINT_PATH + "/user")
        .contentType("application/json"))
        .andExpect(status().isUnauthorized())
        .andDo(print());
  }

}
