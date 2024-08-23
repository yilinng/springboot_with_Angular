package com.example.demo.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

import com.example.demo.entity.Todo;
import com.example.demo.entity.User;

import com.example.demo.repository.UserRepository;

import com.example.demo.security.JwtTokenProvider;
import com.example.demo.service.TodoService;
import com.fasterxml.jackson.databind.ObjectMapper;

//https://dev.to/m1guelsb/authentication-and-authorization-with-spring-boot-4m2n
//https://howtodoinjava.com/spring-boot2/testing/spring-boot-mockmvc-example/
//https://medium.com/@techphile/integration-tests-with-spring-security-af172626631b
//https://www.codejava.net/frameworks/spring-boot/unit-testing-rest-apis-tutorial
//https://stackoverflow.com/questions/70300149/how-to-mock-authenticationmanager-authenticate-method-using-spring-security-and

@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_CLASS)
@SpringBootTest
class TodoControllerTest {
  private static final String END_POINT_PATH = "/api/todos";

  @Autowired
  private WebApplicationContext applicationContext;
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  private TodoService service;

  @MockBean
  private JwtTokenProvider jwtTokenProvider;

  @BeforeEach
  public void init() {
    // clean lastUser
    // setDefaultUser
    this.mockMvc = MockMvcBuilders
        .webAppContextSetup(applicationContext).apply(springSecurity())
        .build();
  }

  /*
   * public User setupUser() {
   * User user = new User();
   * user.setId("1");
   * user.setEmail("test12@test.com");
   * user.setPassword("password");
   * user.setName("John");
   * user.setUsername("Johnnie");
   * // user.setRoles();
   * 
   * user = userRepository.save(user);
   * return user;
   * }
   */
  @Test
  public void testWithoutAUthReturn401Unauthorized() throws Exception {
    Todo newTodo = new Todo();
    newTodo.setTitle("");
    newTodo.setContent("");

    String requestBody = objectMapper.writeValueAsString(newTodo);

    mockMvc.perform(MockMvcRequestBuilders.post(END_POINT_PATH)
        .contentType("application/json")
        .content(requestBody))
        .andExpect(status().isUnauthorized())
        .andDo(print());
  }

  /*
   * @Test
   * public void testAddShouldReturn400BadRequest() throws Exception {
   * Todo newTodo = new Todo();
   * 
   * newTodo.setTitle("");
   * newTodo.setContent("");
   * 
   * LoginDto loginDto = new LoginDto();
   * 
   * loginDto.setUsernameOrEmail(setupUser().getEmail());
   * loginDto.setPassword(setupUser().getPassword());
   * 
   * // Map<String, String> token =
   * // jwtTokenProvider.generateToken(user(setupUser()));
   * 
   * String requestBody = objectMapper.writeValueAsString(newTodo);
   * mockMvc.perform(MockMvcRequestBuilders.post(END_POINT_PATH).with(user(
   * setupUser()))
   * // .header("authorization", "Bearer " + token.get("refreshToken"))
   * .contentType("application/json")
   * .content(requestBody))
   * .andExpect(status().isBadRequest())
   * .andDo(print());
   * }
   * 
   * @Test
   * public void testAddShouldReturn201Created() throws Exception {
   * Todo newTodo = new Todo();
   * newTodo.setId("1");
   * newTodo.setTitle("test_title");
   * newTodo.setContent("test_content");
   * newTodo.setCreateDate(null);
   * 
   * // Map<String, String> token =
   * jwtTokenProvider.generateToken(authentication);
   * 
   * Mockito.when(service.addTodo(newTodo)).thenReturn(newTodo);
   * 
   * String requestBody = objectMapper.writeValueAsString(newTodo);
   * 
   * mockMvc.perform(MockMvcRequestBuilders.post(END_POINT_PATH).with(user(
   * setupUser()))
   * // .header("authorization", "Bearer " + token.get("refreshToken"))
   * .contentType("application/json")
   * .content(requestBody))
   * .andExpect(status().isCreated())
   * .andDo(print());
   * 
   * }
   */
  @Test
  public void testGetAllThenReturn200Ok() throws Exception {
    mockMvc.perform(MockMvcRequestBuilders.get(END_POINT_PATH)
        .contentType("application/json"))
        .andDo(print())
        .andExpect(status().isOk());

  }

}
