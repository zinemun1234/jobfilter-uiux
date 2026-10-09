/* JobFilter 프로토타입 인터랙션 — 실제 구현이 아닌 UX 시연용 */
(function () {
  var path = location.pathname;

  /* 공통 토스트 */
  function toast(msg) {
    var t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText =
      'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);' +
      'background:#1e293b;color:#fff;padding:10px 20px;border-radius:12px;' +
      'font-size:13px;font-weight:600;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,.25);' +
      'opacity:0;transition:opacity .25s';
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.style.opacity = '1'; });
    setTimeout(function () {
      t.style.opacity = '0';
      setTimeout(function () { t.remove(); }, 300);
    }, 2000);
  }

  /* ================= 로그인 (_1): 회원가입 버튼 ================= */
  if (path.indexOf('/_1/') > -1) {
    var s1 = document.getElementById('btn-signup-student');
    var s2 = document.getElementById('btn-signup-recruiter');
    if (s1) s1.addEventListener('click', function () { toast('학생 회원가입 화면으로 이동 (F-01)'); });
    if (s2) s2.addEventListener('click', function () { toast('기업 담당자 회원가입 화면으로 이동 (F-01)'); });

    document.querySelectorAll('button, a').forEach(function (b) {
      var t = (b.textContent || '').replace(/\s+/g, '');
      if (t.indexOf('JobFilter시작하기') > -1) {
        b.addEventListener('click', function (e) {
          e.preventDefault();
          location.href = '../_3/code.html';
        });
      }
      if (t.indexOf('비밀번호찾기') > -1) {
        b.addEventListener('click', function (e) {
          e.preventDefault();
          toast('비밀번호 재설정 메일 발송 (F-03, 컨셉트)');
        });
      }
      if (t.indexOf('30초회원가입') > -1) {
        b.addEventListener('click', function (e) {
          e.preventDefault();
          toast('학교 이메일 인증 기반 간편 가입 (F-01, 컨셉트)');
        });
      }
    });
  }

  /* ================= 공고 목록 (_2): 검색·필터 칩·초기화·카드 클릭 ================= */
  if (path.indexOf('/_2/') > -1) {
    var resetBtn = null;
    document.querySelectorAll('button').forEach(function (b) {
      if (b.textContent.indexOf('초기화') > -1) resetBtn = b;
    });

    function updateResetLabel() {
      if (!resetBtn) return;
      var label = resetBtn.querySelector('.font-label-badge');
      var n = document.querySelectorAll('.js-chip').length;
      if (label) label.textContent = '초기화 (' + n + ')';
    }

    /* 칩 식별: close 아이콘을 포함한 버튼의 부모 div */
    document.querySelectorAll('button').forEach(function (b) {
      var ic = b.querySelector('.material-symbols-outlined');
      if (ic && ic.textContent.trim() === 'close') {
        var chip = b.parentElement;
        chip.classList.add('js-chip');
        b.addEventListener('click', function (e) {
          e.stopPropagation();
          chip.remove();
          updateResetLabel();
        });
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        var chips = document.querySelectorAll('.js-chip');
        if (!chips.length) { toast('적용된 필터가 없습니다'); return; }
        chips.forEach(function (c) { c.remove(); });
        updateResetLabel();
        toast('필터를 초기화했습니다');
      });
    }

    /* 공고 카드 목록 수집 */
    var cards = [];
    document.querySelectorAll('div.relative.group').forEach(function (card) {
      cards.push(card);
      card.style.cursor = 'pointer';
      card.addEventListener('click', function (e) {
        if (e.target.closest('button')) return;
        location.href = '../_4/code.html';
      });
    });

    /* 검색창 입력 → 카드 필터링 (컨셉트 시연용 텍스트 매칭) */
    var searchInput = document.querySelector('input[placeholder*="기업, 기술 스택, 직무 검색"]')
      || document.querySelector('input[placeholder*="검색"]');
    var countEl = null;
    document.querySelectorAll('span').forEach(function (s) {
      if (/총\s*\d+개의/.test(s.textContent)) countEl = s;
    });
    var totalText = countEl ? countEl.textContent.trim() : '';

    if (searchInput && cards.length) {
      /* 검색 결과 없음 상태 (I-07 계열 개선안 시연) */
      var empty = document.createElement('div');
      empty.style.cssText =
        'display:none;text-align:center;padding:48px 20px;color:#64748b;' +
        'background:#fff;border:1px dashed #cbd5e1;border-radius:14px;margin-top:12px';
      empty.innerHTML =
        '<div style="font-size:15px;font-weight:700;color:#334155">검색 결과가 없습니다</div>' +
        '<div style="font-size:12.5px;margin-top:6px">다른 검색어를 입력하거나 필터를 초기화해 보세요.</div>';
      cards[0].parentElement.appendChild(empty);

      searchInput.addEventListener('input', function () {
        var q = searchInput.value.trim();
        var shown = 0;
        cards.forEach(function (c) {
          var hit = !q || c.textContent.indexOf(q) > -1;
          c.style.display = hit ? '' : 'none';
          if (hit) shown++;
        });
        empty.style.display = shown === 0 ? 'block' : 'none';
        if (countEl) {
          countEl.textContent = q
            ? '(' + shown + '개 표시 중 / ' + totalText.replace(/[()]/g, '') + ')'
            : totalText;
        }
      });
    }

    /* 정렬·페이지당 select 변경 */
    document.querySelectorAll('select').forEach(function (sel) {
      sel.addEventListener('change', function () {
        var opt = sel.options[sel.selectedIndex];
        toast('적용: ' + opt.textContent.trim() + ' (컨셉트)');
      });
    });

    /* 카드 내 스크랩 버튼 → 토글 */
    cards.forEach(function (c) {
      c.querySelectorAll('button').forEach(function (b) {
        var ic = b.querySelector('.material-symbols-outlined');
        if (ic && /bookmark/.test(ic.textContent)) {
          var on = false;
          b.addEventListener('click', function (e) {
            e.stopPropagation();
            on = !on;
            ic.textContent = on ? 'bookmark' : 'bookmark_border';
            b.style.color = on ? '#4f46e5' : '';
            toast(on ? '공고를 스크랩했습니다 (F-13)' : '스크랩을 해제했습니다');
          });
        }
      });
    });

    /* 페이지네이션 버튼 */
    document.querySelectorAll('button, a').forEach(function (el) {
      var t = (el.textContent || '').trim();
      if (/^(이전|다음|Previous|Next|\d+)$/.test(t) && el.closest('nav, div')) {
        el.addEventListener('click', function (e) {
          if (el.tagName === 'A') e.preventDefault();
          toast('페이지 이동 — ' + t + ' (컨셉트)');
        });
      }
    });

    /* ===== F-63 공고 비교: "비교 분석 보기" → 카드 선택 → 비교 모달 ===== */
    var picked = [];

    function cardInfo(card) {
      var comp = card.querySelector('.font-headline-sm');
      var title = card.querySelector('h2');
      var match = card.querySelector('.font-metric-tabular');
      var dday = '';
      card.querySelectorAll('span').forEach(function (s) {
        if (!dday && /D-\d|오늘 마감|상시/.test(s.textContent) && s.textContent.trim().length < 16) {
          dday = s.textContent.trim();
        }
      });
      return {
        comp: comp ? comp.textContent.trim() : '기업',
        title: title ? title.textContent.trim() : '공고',
        match: match ? match.textContent.trim() : '-',
        dday: dday || '-',
        el: card
      };
    }

    var bar = document.createElement('div');
    bar.style.cssText =
      'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);' +
      'background:#3525cd;color:#fff;padding:12px 22px;border-radius:14px;' +
      'font-size:13px;font-weight:700;z-index:9999;box-shadow:0 12px 32px rgba(53,37,205,.35);' +
      'display:none;cursor:pointer;align-items:center;gap:10px';
    document.body.appendChild(bar);

    function syncBar() {
      if (!picked.length) { bar.style.display = 'none'; return; }
      bar.style.display = 'flex';
      bar.innerHTML = '공고 비교 (' + picked.length + '/3) — 클릭하면 나란히 비교합니다 (F-63)';
    }

    function openCompare() {
      if (picked.length < 2) { toast('비교할 공고를 2개 이상 선택해 주세요 (F-63)'); return; }
      var ov = document.createElement('div');
      ov.style.cssText =
        'position:fixed;inset:0;background:rgba(11,28,48,.55);z-index:10000;' +
        'display:flex;align-items:center;justify-content:center;padding:24px';
      var cols = picked.map(function (p) {
        return '<div style="flex:1;min-width:0;background:#f8f9ff;border-radius:12px;padding:16px;border:1px solid #dce9ff">' +
          '<div style="font-size:11px;font-weight:700;color:#565e74">' + p.comp + '</div>' +
          '<div style="font-size:13px;font-weight:800;color:#0b1c30;margin:6px 0 12px;line-height:1.4">' + p.title + '</div>' +
          '<div style="font-size:12px;color:#334155">매칭 적합도 <b style="color:#4f46e5">' + p.match + '</b></div>' +
          '<div style="font-size:12px;color:#334155;margin-top:4px">마감 <b>' + p.dday + '</b></div>' +
          '</div>';
      }).join('');
      ov.innerHTML =
        '<div style="background:#fff;border-radius:18px;max-width:860px;width:100%;padding:24px;box-shadow:0 24px 64px rgba(0,0,0,.3)">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">' +
        '<div style="font-size:15px;font-weight:800;color:#0b1c30">공고 비교 분석 <span style="font-size:11px;color:#565e74;font-weight:600">F-63 컨셉트</span></div>' +
        '<button id="jf-cmp-close" style="border:none;background:#e5eeff;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700;cursor:pointer">닫기</button></div>' +
        '<div style="display:flex;gap:12px">' + cols + '</div>' +
        '<div style="margin-top:14px;font-size:11.5px;color:#64748b">조건·태그·요구 역량 나란히 비교 — 실제 구현에서는 북마크 공고 기준으로 확장됩니다.</div>' +
        '</div>';
      document.body.appendChild(ov);
      ov.addEventListener('click', function (e) {
        if (e.target === ov || e.target.id === 'jf-cmp-close') ov.remove();
      });
    }
    bar.addEventListener('click', openCompare);

    cards.forEach(function (c) {
      c.querySelectorAll('button').forEach(function (b) {
        if ((b.textContent || '').indexOf('비교 분석 보기') > -1) {
          b.addEventListener('click', function (e) {
            e.stopPropagation();
            var info = cardInfo(c);
            var idx = -1;
            picked.forEach(function (p, i) { if (p.el === c) idx = i; });
            if (idx > -1) {
              picked.splice(idx, 1);
              c.style.outline = '';
              b.style.background = '';
              b.style.color = '';
            } else {
              if (picked.length >= 3) { toast('최대 3개까지 비교할 수 있습니다 (F-63)'); return; }
              picked.push(info);
              c.style.outline = '2px solid #4f46e5';
              c.style.outlineOffset = '2px';
              c.style.borderRadius = '12px';
              b.style.background = '#4f46e5';
              b.style.color = '#fff';
            }
            syncBar();
          });
        }
        /* 상세 요강 & 지원 → 상세 화면 */
        if ((b.textContent || '').indexOf('상세 요강') > -1) {
          b.addEventListener('click', function (e) {
            e.stopPropagation();
            location.href = '../_4/code.html';
          });
        }
      });
    });
  }

  /* ================= 대시보드 (_3): 추천 공고·마감 공고 클릭 ================= */
  if (path.indexOf('/_3/') > -1) {
    document.querySelectorAll('div.group, article.group, a.group').forEach(function (el) {
      var hasRing = el.querySelector('[class*="rounded-full"]');
      var txt = el.textContent || '';
      if (hasRing && /D-\d|적합도|매칭/.test(txt) && txt.length < 400) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', function (e) {
          if (e.target.closest('button')) return;
          location.href = '../_4/code.html';
        });
      }
    });

    /* ===== F-60 준비도/완성도 카드 + 화면 내 액션 버튼 연결 ===== */
    document.querySelectorAll('button').forEach(function (b) {
      var t = (b.textContent || '').replace(/\s+/g, '');
      if (t.indexOf('상세분석리포트열기') > -1) {
        b.addEventListener('click', function () { location.href = '../ai/code.html'; });
      }
      if (t.indexOf('자소서점검') > -1 || t.indexOf('이어서작성') > -1 || t.indexOf('자소서시작') > -1) {
        b.addEventListener('click', function () { location.href = '../ai/code.html'; });
      }
      if (t.indexOf('새로운자소서첨삭하기') > -1) {
        b.addEventListener('click', function () { location.href = '../ai/code.html'; });
      }
      if (t.indexOf('지원서작성') > -1 || t.indexOf('상세요강보기') > -1) {
        b.addEventListener('click', function () { location.href = '../_4/code.html'; });
      }
      if (t.indexOf('즉시제출') > -1) {
        b.addEventListener('click', function () {
          toast('즉시 제출 — 지원서 최종 제출 플로우 (F-14, 컨셉트)');
        });
      }
      if (t.indexOf('이력서업데이트') > -1) {
        b.addEventListener('click', function () {
          toast('이력서·프로필 갱신 — 스킬 재분석 실행 (F-09, 컨셉트)');
        });
      }
      if (t === '적합도순▼' || t.indexOf('마감임박순') > -1) {
        b.addEventListener('click', function () {
          toast('정렬 변경: ' + (b.textContent || '').trim() + ' (컨셉트)');
        });
      }
    });

    /* 완성도 점수 영역 클릭 → F-60 구성 안내 (가장 안쪽 매칭 요소만) */
    document.querySelectorAll('div, section').forEach(function (el) {
      var txt = el.textContent || '';
      if (/종합 완성도|A\+ 등급/.test(txt) && txt.length < 600 && !el.dataset.jfBound) {
        var innerMatch = false;
        el.querySelectorAll('div').forEach(function (d) {
          if (/종합 완성도|A\+ 등급/.test(d.textContent || '') && (d.textContent || '').length < 600) innerMatch = true;
        });
        if (innerMatch) return;
        el.dataset.jfBound = '1';
        el.style.cursor = 'pointer';
        el.addEventListener('click', function (e) {
          if (e.target.closest('button')) return;
          toast('취업 준비도 = 프로필 완성도 + 자소서·지원 활동 (F-60, 컨셉트)');
        });
      }
    });
  }

  /* ================= 칸반 (_5): 드래그 이동 + 모달 카드 생성 ================= */
  if (path.indexOf('/_5/') > -1) {
    var lists = Array.prototype.slice.call(
      document.querySelectorAll('div.overflow-y-auto.flex.flex-col')
    );
    var dragged = null;
    var justDragged = false;

    function recount() {
      /* 컬럼 헤더 건수 + 상단 스텝 바 건수 동기화 */
      lists.forEach(function (list, i) {
        var n = list.querySelectorAll('.jf-card').length;
        var col = list.closest('div[class*="w-[280px]"]') || list.parentElement;
        var badge = col && col.querySelector('h2 ~ span, h2 + span');
        if (!badge && col) {
          var h2 = col.querySelector('h2');
          if (h2) badge = h2.parentElement.querySelector('span.rounded-full');
        }
        if (badge) badge.textContent = n;
        /* 스텝 바 i번째 아이템의 건수 */
        var bar = document.querySelector('div.md\\:grid-cols-6');
        if (bar && bar.children[i]) {
          var bc = bar.children[i].querySelector('span.font-label-code');
          if (bc) bc.textContent = n;
        }
      });
      /* 헤더 총계 */
      var total = document.querySelectorAll('.jf-card').length;
      document.querySelectorAll('h1, h2').forEach(function (h) {
        h.innerHTML = h.innerHTML.replace(/총\s*\d+건/, '총 ' + total + '건');
      });
      document.querySelectorAll('button').forEach(function (b) {
        if (/전체 보기\s*\d+/.test(b.textContent)) {
          b.innerHTML = b.innerHTML.replace(/전체 보기\s*\d+/, '전체 보기 ' + total);
        }
      });
    }

    function attachCard(card) {
      card.classList.add('jf-card');
      card.setAttribute('draggable', 'true');
      card.style.cursor = 'grab';

      card.addEventListener('dragstart', function (e) {
        dragged = card;
        card.style.opacity = '0.4';
        e.dataTransfer.effectAllowed = 'move';
      });
      card.addEventListener('dragend', function () {
        card.style.opacity = '';
        dragged = null;
        justDragged = true;
        setTimeout(function () { justDragged = false; }, 120);
        lists.forEach(function (l) { l.style.outline = ''; });
      });
      card.addEventListener('click', function (e) {
        if (justDragged) return;
        var btn = e.target.closest('button');
        if (btn) {
          var label = (btn.textContent || '').replace(/\s+/g, ' ').trim();
          var ic = btn.querySelector('.material-symbols-outlined');
          if (ic && label.indexOf(ic.textContent.trim()) > -1) {
            label = label.replace(ic.textContent.trim(), '').trim();
          }
          toast((label || '카드 동작') + ' — 실제 구현에서 제공됩니다');
          return;
        }
        toast('프로토타입 — 카드 상세는 실제 구현에서 제공됩니다');
      });
    }

    lists.forEach(function (list) {
      Array.prototype.slice.call(list.children).forEach(function (c) {
        if (c.matches('div.group.relative')) attachCard(c);
      });
      list.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        list.style.outline = '2px dashed #6366f1';
        list.style.outlineOffset = '-2px';
        list.style.borderRadius = '8px';
      });
      list.addEventListener('dragleave', function () {
        list.style.outline = '';
      });
      list.addEventListener('drop', function (e) {
        e.preventDefault();
        list.style.outline = '';
        if (dragged && dragged.parentElement !== list) {
          list.appendChild(dragged);
          var colName = '';
          var col = list.closest('div[class*="w-[280px]"]') || list.parentElement;
          var h2 = col && col.querySelector('h2');
          if (h2) colName = h2.textContent.trim();
          recount();
          toast('상태 변경: ' + colName + ' (이력 저장됨 — 컨셉트)');
        }
      });
    });

    /* 등록 모달 → 카드 실제 생성 */
    var form = document.querySelector('#new-app-modal form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var inputs = form.querySelectorAll('input[type="text"]');
        var company = (inputs[0] && inputs[0].value.trim()) || '신규 기업';
        var position = (inputs[1] && inputs[1].value.trim()) || '채용 공고';
        var stageSel = form.querySelector('select');
        var dateInput = form.querySelector('input[type="date"]');
        var skillsInput = inputs[2];

        /* D-day 계산 */
        var dday = '';
        if (dateInput && dateInput.value) {
          var diff = Math.round((new Date(dateInput.value) - new Date()) / 86400000);
          dday = diff >= 0 ? 'D-' + diff : 'D+' + (-diff);
        }

        var initials = company.replace(/[^가-힣A-Za-z]/g, '').slice(0, 2).toUpperCase() || 'JF';
        var skillsHtml = '';
        if (skillsInput && skillsInput.value.trim()) {
          skillsInput.value.split(',').slice(0, 3).forEach(function (s) {
            s = s.trim();
            if (s) skillsHtml += '<span class="font-label-badge text-label-badge bg-surface-container-low text-secondary px-1.5 py-0.5 rounded">' + s + '</span>';
          });
        }

        var card = document.createElement('div');
        card.className = 'group relative bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer';
        card.innerHTML =
          '<div class="flex items-start justify-between mb-space-xs">' +
          '<div class="flex items-center gap-2 min-w-0">' +
          '<div class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-bold text-primary text-xs">' + initials + '</div>' +
          '<div class="min-w-0"><h3 class="font-body-md text-body-md font-semibold text-on-surface truncate">' + company + '</h3>' +
          '<p class="font-body-sm text-body-sm text-secondary truncate">' + position + '</p></div>' +
          '</div>' +
          (dday ? '<span class="font-label-code text-label-code font-bold px-2 py-0.5 rounded-full bg-surface-container-highest text-secondary shrink-0">' + dday + '</span>' : '') +
          '</div>' +
          (skillsHtml ? '<div class="flex flex-wrap gap-1 mt-2">' + skillsHtml + '</div>' : '');

        var idx = stageSel ? stageSel.selectedIndex : 0;
        var target = lists[Math.min(idx, lists.length - 1)];
        target.appendChild(card);
        attachCard(card);
        recount();
        form.reset();
        document.getElementById('new-app-modal').classList.add('hidden');
        toast('지원 카드가 등록되었습니다 (컨셉트)');
      });
    }

    /* ===== 상단 뷰 전환·필터 탭 (F-65 캘린더·리스트 뷰 컨셉트) ===== */
    document.querySelectorAll('button').forEach(function (b) {
      if (b.closest('.jf-card')) return;
      var t = (b.textContent || '').replace(/\s+/g, '');
      if (t.indexOf('일정캘린더') > -1) {
        b.addEventListener('click', function () {
          toast('일정 캘린더 뷰 — 공고 마감·면접 일정 오버레이 (F-65, 컨셉트)');
        });
      }
      if (t.indexOf('리스트뷰') > -1 || t.indexOf('칸반보드') > -1) {
        b.addEventListener('click', function () {
          toast('뷰 전환: ' + (b.textContent || '').trim() + ' (컨셉트)');
        });
      }
      if (t.indexOf('전체보기') > -1) {
        b.addEventListener('click', function () {
          toast('전체 지원 내역 목록으로 이동 (F-14, 컨셉트)');
        });
      }
      if (t.indexOf('상반기공채') > -1 || t.indexOf('수시/인턴십') > -1 || t.indexOf('마감임박순') > -1) {
        b.addEventListener('click', function () {
          toast('필터 변경: ' + (b.textContent || '').trim() + ' (컨셉트)');
        });
      }
      if (t.indexOf('면접준비') > -1) {
        b.addEventListener('click', function () {
          toast('면접 준비 체크리스트 — 예상 질문·답변 점검 (F-64, 컨셉트)');
        });
      }
    });
  }

  /* ================= 자소서 (ai): 문항 탭 전환 ================= */
  if (path.indexOf('/ai/') > -1) {
    var tabs = [];
    document.querySelectorAll('button').forEach(function (b) {
      if (/^\d+\.\s/.test(b.textContent.trim())) tabs.push(b);
    });
    tabs.forEach(function (b) {
      b.addEventListener('click', function () {
        tabs.forEach(function (o) {
          o.classList.remove('bg-primary-container', 'text-on-primary');
          o.classList.add('bg-surface-container-high', 'text-secondary');
        });
        b.classList.add('bg-primary-container', 'text-on-primary');
        b.classList.remove('bg-surface-container-high', 'text-secondary');
      });
    });

    /* 에디터 툴바·보조 버튼 → 컨셉트 토스트 */
    var aiLabels = {
      format_bold: '굵게 서식', format_italic: '기울임 서식',
      format_list_bulleted: '목록 서식', format_quote: '인용구 서식',
      code: '코드 블록', format_clear: '서식 초기화',
      undo: '실행 취소', redo: '다시 실행', history: '버전 이력 패널'
    };
    document.querySelectorAll('button').forEach(function (b) {
      var ic = b.querySelector('.material-symbols-outlined');
      var key = ic && aiLabels[ic.textContent.trim()];
      if (key) {
        b.addEventListener('click', function () { toast(key + ' — 실제 구현에서 적용됩니다'); });
      }
      var bt = b.textContent.replace(/\s+/g, '');
      if (bt.indexOf('실시간진단실행') > -1) {
        b.addEventListener('click', function () {
          toast('코칭 분석 실행 — 7개 항목 가중치로 점수 산출 (F-16, 컨셉트)');
        });
      }
      if (bt.indexOf('새문항추가') > -1) {
        b.addEventListener('click', function () { toast('새 자소서 문항 추가 (F-15, 컨셉트)'); });
      }
      if (bt.indexOf('이전버전') > -1) {
        b.addEventListener('click', function () {
          toast('버전 이력 — 문항별 저장 스냅샷 복원 (F-19, 컨셉트)');
        });
      }
      if (bt.indexOf('문장가독성다듬기') > -1) {
        b.addEventListener('click', function () {
          toast('가독성 코칭 — 복문을 능동태로 바꾸는 수정 제안 표시 (F-17, 컨셉트)');
        });
      }
      if (bt.indexOf('자소서템플릿') > -1 || bt.indexOf('템플릿관리자') > -1) {
        b.addEventListener('click', function () {
          toast('합격 자소서 샘플·문항별 템플릿 라이브러리 (F-62, 컨셉트)');
        });
      }
      if (bt.indexOf('복사하기') > -1) { return; } /* 화면 인라인 스크립트가 클립보드 처리 */
      if (/미포함-?추가권장|추가권장/.test(bt)) {
        b.addEventListener('click', function (e) {
          e.stopPropagation();
          var kw = bt.replace(/add|미포함.*$/g, '').trim();
          var ta = document.querySelector('textarea');
          if (ta && ta.value.indexOf(kw) === -1) {
            ta.value += '\n\n[' + kw + ' 관련 경험 서술 추가]';
            toast('추천 키워드 "' + kw + '" 삽입 — 매칭 가중치 반영 (F-16, 컨셉트)');
          } else {
            toast('이미 본문에 포함된 키워드입니다');
          }
        });
      }
      if (bt.indexOf('TXT보내기') > -1) {
        b.addEventListener('click', function () {
          var ta = document.querySelector('textarea');
          var body = ta ? ta.value : '자소서 본문';
          var blob = new Blob([body], { type: 'text/plain;charset=utf-8' });
          var a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = '자소서_초안.txt';
          a.click();
          setTimeout(function () { URL.revokeObjectURL(a.href); }, 10000);
          toast('자소서 본문을 TXT로보냈습니다');
        });
      }
    });
  }

  /* ================= 공통 헤더·사이드바 (_2,_3,_4,_5,ai) ================= */
  /* 알림 벨 → 미니 패널 */
  var bell = null;
  document.querySelectorAll('button').forEach(function (b) {
    var ic = b.querySelector('.material-symbols-outlined');
    if (ic && ic.textContent.trim() === 'notifications' && !bell) bell = b;
  });
  if (bell) {
    var panel = document.createElement('div');
    panel.style.cssText =
      'position:fixed;top:60px;right:24px;width:280px;background:#fff;' +
      'border:1px solid #e2e8f0;border-radius:14px;box-shadow:0 12px 32px rgba(15,23,42,.14);' +
      'z-index:9998;padding:10px 0;display:none;font-family:inherit';
    panel.innerHTML =
      '<div style="padding:6px 16px 10px;font-size:13px;font-weight:800;color:#0f172a;border-bottom:1px solid #f1f5f9">알림 <span style="color:#6366f1">3</span></div>' +
      '<div style="padding:10px 16px;font-size:12.5px;color:#334155;border-bottom:1px solid #f8fafc"><b>마감 임박</b> — 네이버 백엔드 공고 D-2</div>' +
      '<div style="padding:10px 16px;font-size:12.5px;color:#334155;border-bottom:1px solid #f8fafc"><b>서류 합격</b> — 카카오 공고 전형 업데이트</div>' +
      '<div style="padding:10px 16px;font-size:12.5px;color:#334155"><b>새 맞춤 공고</b> — 프로필 매칭 공고 5건 등록</div>' +
      '<div style="padding:8px 16px 4px;text-align:right;font-size:11px;color:#94a3b8">F-25 컨셉트 시연</div>';
    document.body.appendChild(panel);
    bell.style.position = 'relative';
    bell.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = panel.style.display === 'block';
      panel.style.display = open ? 'none' : 'block';
      var badge = bell.querySelector('span.bg-error');
      if (badge) badge.style.display = 'none';
      if (!open) toast('알림 3건을 모두 읽음 처리했습니다 (F-25)');
    });
    document.addEventListener('click', function () { panel.style.display = 'none'; });
    panel.addEventListener('click', function (e) { e.stopPropagation(); });
  }

  /* 헤더 "자소서 작성하기" → 코칭 화면 이동 */
  document.querySelectorAll('button').forEach(function (b) {
    var t = b.textContent.replace(/\s+/g, '');
    if (t === '자소서 작성하기' || t.indexOf('edit_note자소서작성하기') > -1) {
      b.addEventListener('click', function () { location.href = '../ai/code.html'; });
    }
    if (t.indexOf('공고 스크랩') > -1 && t.indexOf('bookmark_add') === -1 && b.querySelector('.material-symbols-outlined')) {
      b.addEventListener('click', function () { toast('공고 스크랩 목록으로 이동 (F-13, 컨셉트)'); });
    }
  });
  /* 정확한 매칭: bookmark_add 아이콘 포함 버튼 */
  document.querySelectorAll('button').forEach(function (b) {
    var ic = b.querySelector('.material-symbols-outlined');
    if (ic && ic.textContent.trim() === 'bookmark_add') {
      b.addEventListener('click', function () { toast('공고 스크랩 목록으로 이동 (F-13, 컨셉트)'); });
    }
    if (ic && ic.textContent.trim() === 'logout') {
      b.addEventListener('click', function () { location.href = '../_1/code.html'; });
    }
    if (ic && ic.textContent.trim() === 'settings') {
      b.addEventListener('click', function () { toast('프로필·환경 설정 (F-27, 컨셉트)'); });
    }
  });


  /* ================= 신규 화면 (_6 준비도 / _7 모의면접 / _8 달력 / _9 기업) ================= */
  if (path.indexOf('/_6/') > -1) {
    document.querySelectorAll('button').forEach(function (b) {
      var t = (b.textContent || '').replace(/\s+/g, '');
      if (t.indexOf('계산근거전체보기') > -1) b.addEventListener('click', function () { toast('항목별 가중치·계산 근거 공개 (F-28, 컨셉트)'); });
      else if (t.indexOf('기록') > -1) b.addEventListener('click', function () { toast('주간 준비도 추이 기록 (F-60, 컨셉트)'); });
    });
    document.querySelectorAll('div.rounded-xl.bg-surface-container-low').forEach(function (el) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', function () { toast('개선 액션 — 해당 기능으로 이동 (F-60, 컨셉트)'); });
    });
  }

  if (path.indexOf('/_7/') > -1) {
    document.querySelectorAll('button').forEach(function (b) {
      var t = (b.textContent || '').replace(/\s+/g, '');
      if (t.indexOf('답변완료') > -1) b.addEventListener('click', function () { toast('키워드 분석 완료 — 3/5 포함, 기록 저장됨 (F-64)'); });
      else if (t.indexOf('질문다시뽑기') > -1) b.addEventListener('click', function () { toast('다른 질문으로 교체 (F-64, 컨셉트)'); });
      else if (t.indexOf('지난기록') > -1) b.addEventListener('click', function () { toast('모의면접 기록 목록 (F-64, 컨셉트)'); });
    });
  }

  if (path.indexOf('/_8/') > -1) {
    document.querySelectorAll('button').forEach(function (b) {
      var ic = b.querySelector('.material-symbols-outlined');
      var t = (b.textContent || '').replace(/\s+/g, '');
      if (t.indexOf('ICS보내기') > -1) b.addEventListener('click', function () { toast('달력 ICS 파일 다운로드 (F-65, 컨셉트)'); });
      else if (ic && ic.textContent.trim() === 'chevron_left') b.addEventListener('click', function () { toast('이전 달 (컨셉트)'); });
      else if (ic && ic.textContent.trim() === 'chevron_right') b.addEventListener('click', function () { toast('다음 달 (컨셉트)'); });
    });
  }

  if (path.indexOf('/_9/') > -1) {
    document.querySelectorAll('button').forEach(function (b) {
      var t = (b.textContent || '').replace(/\s+/g, '');
      if (t.indexOf('새공고등록') > -1) b.addEventListener('click', function () { toast('공고 등록 폼 (F-31, 컨셉트)'); });
      else if (t.indexOf('일괄안내발송') > -1) b.addEventListener('click', function () { toast('선택 지원자에게 단계별 안내 템플릿 발송 (F-71, 컨셉트)'); });
      else if (t.indexOf('선택일괄액션') > -1) b.addEventListener('click', function () { toast('체크된 지원자 일괄 단계 이동 (F-70, 컨셉트)'); });
      else if (t.indexOf('단계별안내템플릿') > -1) b.addEventListener('click', function () { toast('안내 템플릿 관리 (F-71, 컨셉트)'); });
      else if (t === '상세') b.addEventListener('click', function () { toast('지원자 상세 — 자소서·적합도 리포트 (컨셉트)'); });
      else if (t.indexOf('엑셀업로드') > -1) b.addEventListener('click', function () { toast('엑셀 일괄 업로드 미리보기 (F-42, 컨셉트)'); });
      else if (t.indexOf('공고등록') > -1) b.addEventListener('click', function () { toast('공고 등록 폼 (F-31, 컨셉트)'); });
    });
  }

  /* 죽은 링크(#) → 시연 범위 안내 */
  document.querySelectorAll('a[href="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      toast('프로토타입 — 시연 범위 외 화면입니다');
    });
  });
})();
