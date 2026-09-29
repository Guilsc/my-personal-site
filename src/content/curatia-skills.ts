export type CuratiaSkillDefinition = {
  id:string;
  name:string;
  ownerAgentId:string;
  purpose:string;
  lifecycleStage:string[];
  approvalRequired:boolean;
};

export const curatiaSkillRegistry:CuratiaSkillDefinition[]=[
 {id:"trend-evaluation",name:"Trend Evaluation",ownerAgentId:"trend-evaluator",purpose:"Assess why-now, BA impact, second-order implications, evidence strength, saturation, backlog overlap and editorial potential.",lifecycleStage:["Signal"],approvalRequired:false},
 {id:"idea-development",name:"Idea Development",ownerAgentId:"trend-evaluator",purpose:"Turn a deliberately promoted signal or observation into a bounded editorial idea.",lifecycleStage:["Idea","Candidate"],approvalRequired:true},
 {id:"editorial-research",name:"Editorial Research",ownerAgentId:"editorial-researcher",purpose:"Build claims, evidence, limitations and evidence gaps before drafting.",lifecycleStage:["Research"],approvalRequired:false},
 {id:"content-drafting",name:"Content Drafting",ownerAgentId:"content-writer",purpose:"Draft from verified research, thesis and channel context.",lifecycleStage:["Draft"],approvalRequired:false},
 {id:"visual-direction",name:"Visual Direction",ownerAgentId:"visual-director",purpose:"Create a visual concept and implementation brief without implying editorial approval.",lifecycleStage:["Draft","Visual Ready"],approvalRequired:false},
 {id:"publishing-review",name:"Publishing Review",ownerAgentId:"publishing-reviewer",purpose:"Validate approved content, channel readiness and explicit publication intent.",lifecycleStage:["Approved","Scheduled"],approvalRequired:true},
 {id:"post-learning",name:"Post Learning",ownerAgentId:"post-learning",purpose:"Generate evidence-backed learning candidates from published performance.",lifecycleStage:["Published","Learning"],approvalRequired:true}
];
