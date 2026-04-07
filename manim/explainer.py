from manim import *

FONT = "Avenir Next"
BG = "#F5F0EB"
TEXT_PRIMARY = "#1E293B"
TEXT_MUTED = "#64748B"
BLUE = "#4F46E5"
VIOLET = "#7C3AED"
GREEN = "#10B981"
AMBER = "#F59E0B"
RED = "#EF4444"
SF_BLUE = "#00A1E0"


class MetadataFlow(Scene):
    def construct(self):
        self.camera.background_color = BG

        # ══════════════════════════════════════
        # SCENE 1: Title
        # ══════════════════════════════════════
        title = Text("How FlowSprite Works", font=FONT, font_size=52, color=BLUE, weight=BOLD)
        title.shift(UP * 0.5)
        sub = Text("Your metadata. Your repo. One-way safety.", font=FONT, font_size=22, color=TEXT_MUTED)
        sub.next_to(title, DOWN, buff=0.4)

        self.play(FadeIn(title, shift=DOWN * 0.3, run_time=0.8))
        self.play(FadeIn(sub, shift=UP * 0.2, run_time=0.6))
        self.wait(1.2)
        self.play(FadeOut(title, shift=UP * 0.5), FadeOut(sub, shift=UP * 0.3), run_time=0.5)
        self.wait(0.3)

        # ══════════════════════════════════════
        # SCENE 2: Three pillars appear
        # ══════════════════════════════════════
        def make_box(label_text, icon_text, color, x_pos):
            box = RoundedRectangle(
                corner_radius=0.25, width=3, height=2,
                color=color, fill_color=color, fill_opacity=0.07, stroke_width=2.5
            ).shift(RIGHT * x_pos)
            label = Text(label_text, font=FONT, font_size=18, color=color, weight=BOLD)
            label.move_to(box).shift(DOWN * 0.2)
            icon = Text(icon_text, font_size=34)
            icon.move_to(box).shift(UP * 0.3)
            return VGroup(box, icon, label)

        sf = make_box("Salesforce Org", "☁️", SF_BLUE, -4.5)
        gh = make_box("GitHub Repo", "📦", VIOLET, 0)
        sb = make_box("Sandbox", "🧪", GREEN, 4.5)

        # "YOUR" badge on GitHub
        your_badge = RoundedRectangle(
            corner_radius=0.1, width=1.2, height=0.35,
            color=VIOLET, fill_color=VIOLET, fill_opacity=1, stroke_width=0
        ).next_to(gh[0], UP, buff=0.15)
        your_text = Text("YOURS", font=FONT, font_size=11, color=WHITE, weight=BOLD).move_to(your_badge)

        self.play(
            FadeIn(sf, shift=UP * 0.4),
            FadeIn(gh, shift=UP * 0.4),
            FadeIn(sb, shift=UP * 0.4),
            lag_ratio=0.15, run_time=1
        )
        self.play(FadeIn(your_badge), FadeIn(your_text), run_time=0.4)
        self.wait(0.5)

        # ══════════════════════════════════════
        # SCENE 3: Step 1 — PULL
        # ══════════════════════════════════════
        step_label = Text("① PULL", font=FONT, font_size=28, color=SF_BLUE, weight=BOLD)
        step_desc = Text("Metadata syncs to your repo", font=FONT, font_size=16, color=TEXT_MUTED)
        step_group = VGroup(step_label, step_desc).arrange(DOWN, buff=0.15)
        step_group.to_edge(DOWN, buff=0.8)

        self.play(FadeIn(step_group, shift=UP * 0.3), run_time=0.5)

        # Arrow
        arr1 = Arrow(
            sf[0].get_right() + RIGHT * 0.1, gh[0].get_left() + LEFT * 0.1,
            color=SF_BLUE, stroke_width=3, buff=0, max_tip_length_to_length_ratio=0.1
        )
        self.play(GrowArrow(arr1), run_time=0.6)

        # Flowing dots
        for _ in range(4):
            d = Dot(radius=0.07, color=SF_BLUE).move_to(arr1.get_start())
            self.add(d)
            self.play(d.animate.move_to(arr1.get_end()), run_time=0.2, rate_func=linear)
            self.remove(d)

        # Flash GitHub
        self.play(gh[0].animate.set_fill(opacity=0.2), run_time=0.15)
        self.play(gh[0].animate.set_fill(opacity=0.07), run_time=0.15)

        # Metadata checklist
        checks = VGroup(*[
            Text(t, font=FONT, font_size=12, color=VIOLET)
            for t in ["37 metadata types ✓", "Objects, Fields, Flows ✓", "Apex, Permissions ✓"]
        ]).arrange(DOWN, buff=0.08, aligned_edge=LEFT)
        checks.next_to(gh[0], DOWN, buff=0.4)
        self.play(FadeIn(checks, shift=UP * 0.1, lag_ratio=0.3), run_time=0.6)
        self.wait(0.8)
        self.play(FadeOut(step_group), run_time=0.3)

        # ══════════════════════════════════════
        # SCENE 4: Step 2 — REVIEW
        # ══════════════════════════════════════
        step_label2 = Text("② REVIEW", font=FONT, font_size=28, color=VIOLET, weight=BOLD)
        step_desc2 = Text("Every change is a pull request", font=FONT, font_size=16, color=TEXT_MUTED)
        step_group2 = VGroup(step_label2, step_desc2).arrange(DOWN, buff=0.15)
        step_group2.to_edge(DOWN, buff=0.8)
        self.play(FadeIn(step_group2, shift=UP * 0.3), run_time=0.5)

        # PR card
        pr_card = RoundedRectangle(
            corner_radius=0.15, width=2.6, height=1.8,
            color=VIOLET, fill_color=WHITE, fill_opacity=0.95, stroke_width=1.5
        ).shift(DOWN * 1.5)

        pr_header = Text("PR #47", font=FONT, font_size=14, color=VIOLET, weight=BOLD)
        pr_header.move_to(pr_card).shift(UP * 0.55)
        pr_lines = VGroup(
            Text('+ Adds "Renewal_Date"', font=FONT, font_size=10, color=GREEN),
            Text('~ Updates validation rule', font=FONT, font_size=10, color=AMBER),
            Text('→ Activates Lead_Routing', font=FONT, font_size=10, color=BLUE),
        ).arrange(DOWN, buff=0.1, aligned_edge=LEFT).move_to(pr_card).shift(DOWN * 0.15)

        # Remove checks first to avoid overlap
        self.play(FadeOut(checks), run_time=0.2)
        self.play(FadeIn(pr_card), Write(pr_header), run_time=0.5)
        self.play(FadeIn(pr_lines, lag_ratio=0.3), run_time=0.6)
        self.wait(0.8)
        self.play(FadeOut(step_group2), run_time=0.3)

        # ══════════════════════════════════════
        # SCENE 5: Step 3 — DEPLOY
        # ══════════════════════════════════════
        step_label3 = Text("③ DEPLOY", font=FONT, font_size=28, color=GREEN, weight=BOLD)
        step_desc3 = Text("Approved changes go to sandbox only", font=FONT, font_size=16, color=TEXT_MUTED)
        step_group3 = VGroup(step_label3, step_desc3).arrange(DOWN, buff=0.15)
        step_group3.to_edge(DOWN, buff=0.8)
        self.play(FadeIn(step_group3, shift=UP * 0.3), run_time=0.5)

        # Fade out PR card
        self.play(FadeOut(pr_card), FadeOut(pr_header), FadeOut(pr_lines), run_time=0.3)

        # Arrow GitHub → Sandbox
        arr2 = Arrow(
            gh[0].get_right() + RIGHT * 0.1, sb[0].get_left() + LEFT * 0.1,
            color=GREEN, stroke_width=3, buff=0, max_tip_length_to_length_ratio=0.1
        )
        self.play(GrowArrow(arr2), run_time=0.6)

        for _ in range(4):
            d = Dot(radius=0.07, color=GREEN).move_to(arr2.get_start())
            self.add(d)
            self.play(d.animate.move_to(arr2.get_end()), run_time=0.2, rate_func=linear)
            self.remove(d)

        # Flash sandbox
        self.play(sb[0].animate.set_fill(opacity=0.25), run_time=0.15)
        self.play(sb[0].animate.set_fill(opacity=0.07), run_time=0.15)

        deployed = Text("Deployed ✓", font=FONT, font_size=14, color=GREEN, weight=BOLD)
        deployed.next_to(sb[0], DOWN, buff=0.3)
        self.play(FadeIn(deployed, scale=1.2), run_time=0.4)
        self.wait(0.6)
        self.play(FadeOut(step_group3), run_time=0.3)

        # ══════════════════════════════════════
        # SCENE 6: Step 4 — PRODUCTION BOUNDARY
        # ══════════════════════════════════════
        step_label4 = Text("④ PRODUCTION", font=FONT, font_size=28, color=RED, weight=BOLD)
        step_desc4 = Text("You push. Never us. Never.", font=FONT, font_size=16, color=TEXT_MUTED)
        step_group4 = VGroup(step_label4, step_desc4).arrange(DOWN, buff=0.15)
        step_group4.to_edge(DOWN, buff=0.8)
        self.play(FadeIn(step_group4, shift=UP * 0.3), run_time=0.5)

        # Red blocked indicator
        block = Text("🚫", font_size=40).next_to(sb[0], DOWN, buff=1.2)
        block_label = Text("BLOCKED", font=FONT, font_size=13, color=RED, weight=BOLD)
        block_label.next_to(block, DOWN, buff=0.15)
        manual = Text("Production = manual only", font=FONT, font_size=11, color=TEXT_MUTED)
        manual.next_to(block_label, DOWN, buff=0.1)

        self.play(FadeOut(deployed), run_time=0.2)
        self.play(FadeIn(block, scale=1.5), run_time=0.4)
        self.play(FadeIn(block_label), FadeIn(manual), run_time=0.4)
        self.wait(1)

        # ══════════════════════════════════════
        # SCENE 7: Finale
        # ══════════════════════════════════════
        self.play(
            *[FadeOut(m) for m in self.mobjects],
            run_time=0.6
        )

        final = Text("Your Salesforce. Your repo.", font=FONT, font_size=44, color=TEXT_PRIMARY, weight=BOLD)
        final2 = Text("Zero risk.", font=FONT, font_size=44, color=BLUE, weight=BOLD)
        final2.next_to(final, DOWN, buff=0.25)
        self.play(FadeIn(final, shift=UP * 0.3), run_time=0.7)
        self.play(FadeIn(final2, shift=UP * 0.3), run_time=0.7)
        self.wait(2)
