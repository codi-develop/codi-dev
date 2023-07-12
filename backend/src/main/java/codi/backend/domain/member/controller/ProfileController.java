package codi.backend.domain.member.controller;

import codi.backend.domain.member.dto.ProfileDto;
import codi.backend.domain.member.entity.Profile;
import codi.backend.domain.member.mapper.ProfileMapper;
import codi.backend.domain.member.service.ProfileService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Api(tags = { "Profile" })
@RestController
@RequestMapping("/api/v1/profiles")
@Validated
@Slf4j
public class ProfileController {
    private ProfileService profileService;
    private ProfileMapper profileMapper;

    public ProfileController(ProfileService profileService, ProfileMapper profileMapper) {
        this.profileService = profileService;
        this.profileMapper = profileMapper;
    }

    // 프로필 등록
    // TODO 추후 로그인 한 사용자의 로그인 정보를 함께 받는 방식으로 변경이 필요
    @ApiOperation(value = "프로필 등록", notes = "프로필 이미지, 직무, 경력, 학력, 장애 구분, 중증도, 장애 기간을 입력해서 프로필을 작성한다.")
    @PostMapping("/{member-id}")
    public ResponseEntity createProfile(@PathVariable("member-id") String memberId, @Valid @RequestBody ProfileDto.ProfilePost profilePostDto) {
        Profile profile = profileService.createProfile(memberId, profileMapper.profilePostDtoToProfile(profilePostDto));
        ProfileDto.ProfileResponse response = profileMapper.profileToProfileResponse(profile);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // 프로필 정보 수정
    // TODO 추후 로그인 한 사용자의 로그인 정보를 함께 받는 방식으로 변경이 필요
    @ApiOperation(value = "프로필 정보 수정", notes = "프로필 이미지, 직무, 연차, 학력, 장애구분, 중증도, 장애기간, 소개를 선택해서 수정할 수 있다.")
    @PatchMapping("/{member-id}")
    public ResponseEntity updateProfile(@PathVariable("member-id") String memberId, @Valid @RequestBody ProfileDto.ProfilePatch profilePatchDto) {
        Profile profile = profileService.updateProfileInformation(memberId, profileMapper.profilePatchDtoToProfile(profilePatchDto));
        ProfileDto.ProfileResponse response = profileMapper.profileToProfileResponse(profile);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 프로필 정보 조회
    // TODO 추후 로그인 한 사용자의 로그인 정보를 함께 받는 방식으로 변경이 필요
    @ApiOperation(value = "프로필 페이지 조회", notes = "프로필 페이지에 입력한 정보를 조회할 수 있다.")
    @GetMapping("/{member-id}")
    public ResponseEntity getProfile(@PathVariable("member-id") String memberId) {
        ProfileDto.ProfileResponse profile = profileMapper.profileToProfileResponse(profileService.findProfile(memberId));
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }
}
