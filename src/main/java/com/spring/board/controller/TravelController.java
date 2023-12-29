package com.spring.board.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.board.service.TravelService;
import com.spring.board.vo.TravelVo;
import com.spring.board.vo.UserVo;

@Controller
@RequestMapping("/travel")
public class TravelController {
	
	private final Logger log = LoggerFactory.getLogger(TravelController.class);
	private final TravelService travelService;
	
	@Autowired
	public TravelController(TravelService travelService) {
		this.travelService = travelService;
	}
	
	
	@RequestMapping(value="/login.do", method=RequestMethod.GET)
	public String loginView() throws Exception{
		log.trace("loginView() invoked.");
		return "/travel/login";
	}
	
	@ResponseBody
	@RequestMapping(value="/login.do", method=RequestMethod.POST)
	public Map<String, Object> loginAction(@RequestBody UserVo userVo, HttpSession session) throws Exception{
		log.trace("loginAction({}) invoked.", userVo);
		
		Map<String, Object> map = new HashMap<>();
		
		session.setAttribute("__user__", userVo);
		map.put("redirect", "/travel/userRequest.do");
		
		return map;
	}

	@RequestMapping(value="/userRequest.do", method=RequestMethod.GET)
	public String userRequestView(HttpSession session, Model model) {
		log.trace("userRequestView() invoked.");
		
		UserVo userVo = (UserVo) session.getAttribute("__user__");
		log.info("userVo: {}", userVo);
		
		if(userVo != null) {
			model.addAttribute("user", userVo);
		}else {
			return "redirect:/travel/login.do";
		}
		
		return "/travel/user_request";
	}
	
	@ResponseBody
	@RequestMapping(value="/userRequest.do", method=RequestMethod.POST)
	public Map<String, Object> userRequestAction(@RequestBody UserVo userVo) {
		log.trace("userRequestAction({}) invoked.",userVo);
		
		Map<String, Object> map = new HashMap<>();
		Integer affectedRows = this.travelService.submitQuoteRequest(userVo);
		
		map.put("result", affectedRows);
		
		return map;
	}
	
	@RequestMapping(value="/admin.do", method=RequestMethod.GET)
	public String adminView(Model model) {
		log.trace("adminView() invoked.");
		
		List<UserVo> users = travelService.findAllRequestUser();
		log.info(users.toString());
		model.addAttribute("users", users);
		
		return "/travel/admin";
	}
	
	@ResponseBody
	@RequestMapping(value="/admin.do", method=RequestMethod.POST)
	public Map<String, Object> adminAddPlans(@RequestBody UserVo userVo){
		log.trace("adminAddPlans({}) invoked.",userVo.getTravelVo());
		Map<String, Object> map = new HashMap<>();
		Integer affectedRows = this.travelService.submitTravelPlans(userVo.getTravelVo());
		log.info("affectedRows::{}",affectedRows);
		
		map.put("result", affectedRows);
		
		return map;
	}
}
